import asyncHandler from '../config/asyncHandler.js';
import ApiError from '../config/ApiError.js';
import ApiResponse from '../config/ApiResponse.js';
import { executeQuery } from '../config/executeQuery.js';

const markAttendance = asyncHandler(async (req, res, next) => {
  const { class: studentClass, division, date, students } = req.body;

  if (!studentClass || !division || !date || !Array.isArray(students)) {
    return next(new ApiError(400, 'Invalid request data'));
  }

  try {
    // Insert attendance record
    const attendanceResult = await executeQuery(
      'INSERT INTO Attendance (date, std, div) OUTPUT INSERTED.at_id VALUES (@date, @std, @div)',
      [
        { name: 'date', value: date },
        { name: 'std', value: studentClass },
        { name: 'div', value: division },
      ]
    );

    const attendanceId = attendanceResult.recordset[0].at_id;

    // Loop through the students and mark their attendance
    for (const student of students) {
      const { id: studentId, present } = student;

      // Check if the student exists
      const studentResult = await executeQuery(
        'SELECT stu_id FROM Students WHERE stu_id = @stu_id AND std = @std AND div = @div',
        [
          { name: 'stu_id', value: studentId },
          { name: 'std', value: studentClass },
          { name: 'div', value: division },
        ]
      );

      if (studentResult.recordset.length === 0) {
        return next(new ApiError(404, `Student with ID ${studentId} not found`));
      }

      const studentMarkedAttendance = await executeQuery(
        'INSERT INTO StudentAttendance_Marked (stu_id, isPresent, at_id) VALUES (@stu_id, @isPresent, @at_id)',
        [
          { name: 'stu_id', value: studentId },
          { name: 'isPresent', value: present ? 1 : 0 },
          { name: 'at_id', value: attendanceId },
        ]
      );

    }

    res
      .status(200)
      .json(new ApiResponse(200, studentMarkedAttendance.recordset, 'Attendance marked successfully'));
  } catch (error) {
    next(new ApiError(500, 'An error occurred while marking attendance', [], error.stack));
  }
});

export default markAttendance;
