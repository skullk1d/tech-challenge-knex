exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('media').del()
  await knex('questions').del()
  await knex('answers').del()
  await knex('knowledgeCheckBlocks').del()

  // Inserts seed entries
  await knex('media').insert({
    id: '9b18dff4-8891-4874-a43d-ccc00477a19b',
    type: 'image',
    url: 'https://images.articulate.com/f:jpg%7Cpng,a:retain,b:fff/rise/courses/S3jQ2LjHDoRsPUQmR7dp6hA7-IaoYPA4/d229V-nstxA6tZdi.gif',
  })

  await knex('questions').insert({
    id: 'a8ebfafd-d81a-42ec-b54c-c14d007cd54e',
    text: 'What is this a picture of?',
    mediaId: '9b18dff4-8891-4874-a43d-ccc00477a19b',
  })

  await knex('answers').insert([
    {
      id: '023d3f04-194a-484e-aad4-800ee04de372',
      knowledgeCheckBlockId: 'e50acfd3-a870-4cad-9ef2-a2ca30d24d81',
      text: 'Cookies and coffee',
      isCorrect: true,
      pos: 0,
    },
    {
      id: 'e676187a-4b38-4d7c-8274-89c7e7c2fed6',
      knowledgeCheckBlockId: 'e50acfd3-a870-4cad-9ef2-a2ca30d24d81',
      text: 'Donuts and cider',
      isCorrect: false,
      pos: 1,
    },
  ])

  await knex('knowledgeCheckBlocks').insert({
    id: 'e50acfd3-a870-4cad-9ef2-a2ca30d24d81',
    questionId: 'a8ebfafd-d81a-42ec-b54c-c14d007cd54e',
    feedback: 'I just love cookies and a warm cup of coffee!',
  })

}
