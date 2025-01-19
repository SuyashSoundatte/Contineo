import asyncHandler from '../config/asyncHandler.js';
import ApiError from '../config/ApiError.js';
import ApiResponse from '../config/ApiResponse.js';
import { executeQuery } from '../config/executeQuery.js';

// Mark attendance for a class
const markAttendance = asyncHandler(async (req, res) => {
  const { class: studentClass, division, date, students } = req.body;

  if (!studentClass?.trim() || !division?.trim() || !date || !Array.isArray(students) || students.length === 0) {
    throw new ApiError(400, 'Please provide valid class, division, date and students data');
  }

  const attendanceDate = new Date(date);
  if (isNaN(attendanceDate.getTime())) {
    throw new ApiError(400, 'Invalid date format');
  }

  // Check for existing attendance
  const existingAttendance = await executeQuery(
    'SELECT at_id FROM Attendance WHERE date = @date AND std = @std AND div = @div',
    [
      { name: 'date', value: attendanceDate },
      { name: 'std', value: studentClass },
      { name: 'div', value: division },
    ]
  );

  if (existingAttendance.recordset.length > 0) {
    throw new ApiError(400, 'Attendance for this class, division and date already exists');
  }

  // Insert attendance record
  const attendanceResult = await executeQuery(
    'INSERT INTO Attendance (date, std, div) OUTPUT INSERTED.at_id VALUES (@date, @std, @div)',
    [
      { name: 'date', value: attendanceDate },
      { name: 'std', value: studentClass },
      { name: 'div', value: division },
    ]
  );

  const attendanceId = attendanceResult.recordset[0].at_id;

  // Insert individual attendance records
  for (const student of students) {
    await executeQuery(
      'INSERT INTO StudentAttendance_Marked (stu_id, isPresent, at_id) VALUES (@stu_id, @isPresent, @at_id)',
      [
        { name: 'stu_id', value: student.id },
        { name: 'isPresent', value: student.present ? 1 : 0 },
        { name: 'at_id', value: attendanceId },
      ]
    );
  }

  // Get marked attendance details
  const markedAttendance = await executeQuery(`
    SELECT s.roll_no, s.stu_id, sam.isPresent
    FROM StudentAttendance_Marked sam
    JOIN Students s ON s.stu_id = sam.stu_id
    WHERE sam.at_id = @at_id
    ORDER BY s.roll_no`,
    [{ name: 'at_id', value: attendanceId }]
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        attendanceId,
        date: attendanceDate,
        class: studentClass,
        division,
        markedStudents: markedAttendance.recordset
      },
      'Attendance marked successfully'
    )
  );
});

// Get attendance by date range for a class
const getAttendanceByDateRange = asyncHandler(async (req, res) => {
  const { class: studentClass, division, startDate, endDate } = req.query;

  if (!studentClass || !division || !startDate || !endDate) {
    throw new ApiError(400, 'Missing required parameters');
  }

  const attendance = await executeQuery(`
    SELECT a.date, a.std, a.div, 
           s.stu_id, s.roll_no, sam.isPresent
    FROM Attendance a
    JOIN StudentAttendance_Marked sam ON a.at_id = sam.at_id
    JOIN Students s ON sam.stu_id = s.stu_id
    WHERE a.std = @std 
    AND a.div = @div 
    AND a.date BETWEEN @startDate AND @endDate
    ORDER BY a.date, s.roll_no`,
    [
      { name: 'std', value: studentClass },
      { name: 'div', value: division },
      { name: 'startDate', value: new Date(startDate) },
      { name: 'endDate', value: new Date(endDate) }
    ]
  );

  return res.status(200).json(
    new ApiResponse(200, attendance.recordset, 'Attendance records retrieved successfully')
  );
});

// Get attendance statistics for a student
const getStudentAttendanceStats = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const { startDate, endDate } = req.query;

  const stats = await executeQuery(`
    SELECT 
      s.stu_id,
      s.roll_no,
      COUNT(sam.stu_attend_id) as total_days,
      SUM(CASE WHEN sam.isPresent = 1 THEN 1 ELSE 0 END) as present_days,
      CAST(SUM(CASE WHEN sam.isPresent = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(sam.stu_attend_id) AS DECIMAL(5,2)) as attendance_percentage
    FROM Students s
    LEFT JOIN StudentAttendance_Marked sam ON s.stu_id = sam.stu_id
    LEFT JOIN Attendance a ON sam.at_id = a.at_id
    WHERE s.stu_id = @studentId
    AND (@startDate IS NULL OR a.date >= @startDate)
    AND (@endDate IS NULL OR a.date <= @endDate)
    GROUP BY s.stu_id, s.roll_no`,
    [
      { name: 'studentId', value: studentId },
      { name: 'startDate', value: startDate ? new Date(startDate) : null },
      { name: 'endDate', value: endDate ? new Date(endDate) : null }
    ]
  );

  if (stats.recordset.length === 0) {
    throw new ApiError(404, 'Student not found or no attendance records exist');
  }

  return res.status(200).json(
    new ApiResponse(200, stats.recordset[0], 'Attendance statistics retrieved successfully')
  );
});

// Update attendance for a specific date
const updateAttendance = asyncHandler(async (req, res) => {
  const { attendanceId } = req.params;
  const { students } = req.body;

  if (!Array.isArray(students)) {
    throw new ApiError(400, 'Invalid students data');
  }

  for (const student of students) {
    await executeQuery(`
      UPDATE StudentAttendance_Marked 
      SET isPresent = @isPresent 
      WHERE at_id = @at_id AND stu_id = @stu_id`,
      [
        { name: 'isPresent', value: student.present ? 1 : 0 },
        { name: 'at_id', value: attendanceId },
        { name: 'stu_id', value: student.id }
      ]
    );
  }

  // Get updated attendance records
  const updatedAttendance = await executeQuery(`
    SELECT s.roll_no, s.stu_id, sam.isPresent
    FROM StudentAttendance_Marked sam
    JOIN Students s ON s.stu_id = sam.stu_id
    WHERE sam.at_id = @at_id
    ORDER BY s.roll_no`,
    [{ name: 'at_id', value: attendanceId }]
  );

  return res.status(200).json(
    new ApiResponse(200, updatedAttendance.recordset, 'Attendance updated successfully')
  );
});

export {
  markAttendance,
  getAttendanceByDateRange,
  getStudentAttendanceStats,
  updateAttendance
};