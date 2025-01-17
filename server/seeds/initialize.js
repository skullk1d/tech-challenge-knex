exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex("answers").del();
  await knex("knowledgeCheckBlocks").del();
  await knex("questions").del();
  await knex("media").del();
  await knex("uiState").del();

  // Inserts seed entries
  await knex("media").insert([
    {
      id: "9b18dff4-8891-4874-a43d-ccc00477a19b",
      type: "image",
      url: "https://images.articulate.com/f:jpg%7Cpng,a:retain,b:fff/rise/courses/S3jQ2LjHDoRsPUQmR7dp6hA7-IaoYPA4/d229V-nstxA6tZdi.gif",
    },
    {
      id: "c86232bb-2bca-4c72-a046-e7f6dc78b4a6",
      type: "image",
      url: "https://images.articulate.com/f:jpg,a:retain,b:fff,w:1680,q:65/rise/courses/Dd__WlR_sLLXjJ3h8WX9JlZ6n2YGcYBY/dOnS66X1YMkCMnTA-stock-image.jpg",
    },
    {
      id: "eb3af7b2-b216-47a1-8216-7817420f5773",
      type: "image",
      url: "https://images.articulate.com/f:jpg%7Cpng,a:retain,b:fff/rise/courses/S3jQ2LjHDoRsPUQmR7dp6hA7-IaoYPA4/d229V-nstxA6tZdi.gif",
    },
    {
      id: "a49284ac-dbf8-4081-8efb-4527d3f90d17",
      type: "image",
      url: "https://images.articulate.com/f:jpg%7Cpng,a:retain,b:fff/rise/courses/S3jQ2LjHDoRsPUQmR7dp6hA7-IaoYPA4/d229V-nstxA6tZdi.gif",
    },
    {
      id: "5fc1fbe0-4e6f-47db-855c-6d15f808e657",
      type: "image",
      url: "https://images.articulate.com/f:jpg%7Cpng,a:retain,b:fff/rise/courses/S3jQ2LjHDoRsPUQmR7dp6hA7-IaoYPA4/d229V-nstxA6tZdi.gif",
    },
  ]);

  await knex("questions").insert([
    {
      id: "a8ebfafd-d81a-42ec-b54c-c14d007cd54e",
      text: "What is this a picture of?",
      mediaId: "9b18dff4-8891-4874-a43d-ccc00477a19b",
    },
    {
      id: "5c96f2bd-090a-4d8a-80b8-4d90c4299101",
      text: "Who is this a picture of?",
      mediaId: "c86232bb-2bca-4c72-a046-e7f6dc78b4a6",
    },
    {
      id: "66a06031-128d-494e-933c-3ddf0ccc395e",
      text: "Why is this a picture?",
      mediaId: "eb3af7b2-b216-47a1-8216-7817420f5773",
    },
    {
      id: "70026c75-39ba-414e-9a8d-389258dece28",
      text: "Where is this picture from?",
      mediaId: "a49284ac-dbf8-4081-8efb-4527d3f90d17",
    },
    {
      id: "c2fc1261-a638-433e-8995-4897052ca15f",
      text: "When is this picture from?",
      mediaId: "5fc1fbe0-4e6f-47db-855c-6d15f808e657",
    },
  ]);

  await knex("knowledgeCheckBlocks").insert([
    {
      id: "e50acfd3-a870-4cad-9ef2-a2ca30d24d81",
      questionId: "a8ebfafd-d81a-42ec-b54c-c14d007cd54e",
      feedback: "I just love cookies and a warm cup of coffee!",
    },
    // DEBUG
    {
      id: "b963b3fb-5b0f-40bb-b0d1-010beaf9ca99",
      questionId: "5c96f2bd-090a-4d8a-80b8-4d90c4299101",
      feedback: "Definitely not Janice from accounting.",
    },
  ]);

  await knex("answers").insert([
    {
      id: "023d3f04-194a-484e-aad4-800ee04de372",
      knowledgeCheckBlockId: "e50acfd3-a870-4cad-9ef2-a2ca30d24d81",
      text: "Cookies and coffee",
      isCorrect: true,
      pos: 0,
    },
    {
      id: "e676187a-4b38-4d7c-8274-89c7e7c2fed6",
      knowledgeCheckBlockId: "e50acfd3-a870-4cad-9ef2-a2ca30d24d81",
      text: "Donuts and cider",
      isCorrect: false,
      pos: 1,
    },
    // DEBUG
    {
      id: "305fae31-d84f-4f39-9073-2805df980c0d",
      knowledgeCheckBlockId: "b963b3fb-5b0f-40bb-b0d1-010beaf9ca99",
      text: "Jill from IT",
      isCorrect: true,
      pos: 1,
    },
    {
      id: "2040d5ba-50f2-419f-bd41-5f5dc4f17e81",
      knowledgeCheckBlockId: "b963b3fb-5b0f-40bb-b0d1-010beaf9ca99",
      text: "Janice from Accounting",
      isCorrect: false,
      pos: 0,
    },
    {
      id: "a270c708-9f3e-4aca-a8b9-1ddbd4409bc1",
      knowledgeCheckBlockId: "b963b3fb-5b0f-40bb-b0d1-010beaf9ca99",
      text: "Jane from HR",
      isCorrect: false,
      pos: 2,
    },
  ]);
};
