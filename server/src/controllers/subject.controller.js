import asyncHandler from '../middlewares/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { executeQuery } from '../utils/dbQuery.js';

const addSubjectData = asyncHandler(async (req, res, next) => {
  const { subject, topics } = req.body;

  if (!subject || !topics || !Array.isArray(topics)) {
    return next(new ApiError(400, 'Invalid request data'));
  }

  try {
    // Check if the subject already exists
    const subjectResult = await executeQuery(
      'SELECT sub_id FROM Subjects WHERE subject = @subject',
      [{ name: 'subject', value: subject }]
    );

    let subjectId;

    if (subjectResult.recordset.length > 0) {
      subjectId = subjectResult.recordset[0].sub_id;
    } else {
      // Insert the subject if it doesn't exist
      const insertSubjectResult = await executeQuery(
        'INSERT INTO Subjects (subject) OUTPUT INSERTED.sub_id VALUES (@subject)',
        [{ name: 'subject', value: subject }]
      );
      subjectId = insertSubjectResult.recordset[0].sub_id;
    }

    // Loop through the topics and insert them
    for (const topic of topics) {
      const { topic: topicTitle, subtopics } = topic;

      // Check if the topic already exists under the subject
      const topicResult = await executeQuery(
        'SELECT topic_id FROM Topics WHERE sub_id = @sub_id AND title = @title',
        [
          { name: 'sub_id', value: subjectId },
          { name: 'title', value: topicTitle },
        ]
      );

      let topicId;

      if (topicResult.recordset.length > 0) {
        topicId = topicResult.recordset[0].topic_id;
      } else {
        // Insert the topic if it doesn't exist
        const insertTopicResult = await executeQuery(
          'INSERT INTO Topics (sub_id, title) OUTPUT INSERTED.topic_id VALUES (@sub_id, @title)',
          [
            { name: 'sub_id', value: subjectId },
            { name: 'title', value: topicTitle },
          ]
        );
        topicId = insertTopicResult.recordset[0].topic_id;
      }

      // Loop through the subtopics and insert them
      if (subtopics && Array.isArray(subtopics)) {
        for (const subtopic of subtopics) {
          // Check if the subtopic already exists under the subject
          const subtopicResult = await executeQuery(
            'SELECT sub_topic_id FROM SubTopics WHERE sub_id = @sub_id AND subtopics = @subtopics',
            [
              { name: 'sub_id', value: subjectId },
              { name: 'subtopics', value: subtopic },
            ]
          );

          if (subtopicResult.recordset.length === 0) {
            // Insert the subtopic if it doesn't exist
            await executeQuery(
              'INSERT INTO SubTopics (sub_id, subtopics) VALUES (@sub_id, @subtopics)',
              [
                { name: 'sub_id', value: subjectId },
                { name: 'subtopics', value: subtopic },
              ]
            );
          }
        }
      }
    }

    res
      .status(200)
      .json(new ApiResponse(200, null, 'Data inserted successfully'));
  } catch (error) {
    next(new ApiError(500, 'An error occurred while inserting data', [], error.stack));
  }
});

export default addSubjectData;
/*
data is incoming in this format

  "subject": "Physics",
  "topics": [
    {
      "subject": "Physics",
      "topic": "Mechanics",
      "subtopics": ["Kinematics", "Dynamics", "Work and Energy"]
    },
    {
      "subject": "Physics",
      "topic": "Electromagnetism",
      "subtopics": ["Electric Fields", "Magnetic Fields", "Electromagnetic Waves"]
    }
  ]
}
 */