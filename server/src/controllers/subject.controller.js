import asyncHandler from '../config/asyncHandler.js';
import ApiError from '../config/ApiError.js';
import ApiResponse from '../config/ApiResponse.js';
import {executeQuery} from '../config/executeQuery.js';

const addSubjectData = asyncHandler(async (req, res, next) => {
  const { subject, topics } = req.body;

  if (!subject?.trim() || !Array.isArray(topics) || topics.length === 0) {
    throw new ApiError(400, 'Please provide valid subject and topics data');
  }

  const subjectResult = await executeQuery(
    `MERGE INTO Subjects AS target
     USING (VALUES (@subject)) AS source (subject)
     ON target.subject = source.subject
     WHEN NOT MATCHED THEN
         INSERT (subject) VALUES (@subject)
     WHEN MATCHED THEN
         UPDATE SET subject = @subject
     OUTPUT INSERTED.sub_id;`,
    [{ name: 'subject', value: subject }]
  );

  const subjectId = subjectResult.recordset[0].sub_id;

  for (const topicData of topics) {
    const { topic: topicTitle, subtopics } = topicData;

    if (!topicTitle?.trim()) {
      throw new ApiError(400, 'Invalid topic title');
    }

    const topicResult = await executeQuery(
      `MERGE INTO Topics AS target
       USING (VALUES (@sub_id, @title)) AS source (sub_id, title)
       ON target.sub_id = source.sub_id AND target.title = source.title
       WHEN NOT MATCHED THEN
           INSERT (sub_id, title) VALUES (@sub_id, @title)
       WHEN MATCHED THEN
           UPDATE SET title = @title
       OUTPUT INSERTED.topic_id;`,
      [
        { name: 'sub_id', value: subjectId },
        { name: 'title', value: topicTitle }
      ]
    );

    const topicId = topicResult.recordset[0].topic_id;

    if (Array.isArray(subtopics) && subtopics.length > 0) {
      for (const subtopic of subtopics) {
        if (subtopic?.trim()) {
          await executeQuery(
            `MERGE INTO SubTopics AS target
             USING (VALUES (@sub_id, @subtopic)) AS source (sub_id, subtopics)
             ON target.sub_id = source.sub_id AND target.subtopics = source.subtopics
             WHEN NOT MATCHED THEN
                 INSERT (sub_id, subtopics)
                 VALUES (@sub_id, @subtopic);`,
            [
              { name: 'sub_id', value: subjectId },
              { name: 'subtopic', value: subtopic }
            ]
          );
        }
      }
    }
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { subject, topicsCount: topics.length },
      'Data inserted successfully'
    )
  );
});

const getSyllabus = asyncHandler(async(req, res)=>{
  const getSubjectQuery = `
    select s.sub_id, s.subject, t.title, st.subtopics
    from Subjects s
    join Topics t on s.sub_id = t.sub_id
    left join SubTopics st on s.sub_id = st.sub_id
    order by s.sub_id asc
  `

  const subjectResult = await executeQuery(getSubjectQuery)

  res.send(new ApiResponse(200, subjectResult.recordset, "successfully subject data fetched"));
})

export  {addSubjectData, getSyllabus};