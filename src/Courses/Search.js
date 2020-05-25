export const data = {
  name: [
    "Autumn",
    "Spring",
  ],
  semester: ["Autumn","Spring"],
  category: ["Difficulty", "Practicality", "Load/Stress"],
    
  ratings: [
    {
      rating: 1,
      text: '一回食べたら満足かな〜'
    },
    {
      rating: 2,
      text: 'まぁまぁかな。'
    },
    {
      rating: 3,
      text: '普通に美味しい'
    },
    {
      rating: 4,
      text: 'よかった。オススメしたい'
    },
    {
      rating: 5,
      text: 'アンジャッシュ渡部推薦レベル！！'
    }
  ]
}

export const getRandomItem = (items) => {
  return items[Math.floor(Math.random()*items.length)];
}
