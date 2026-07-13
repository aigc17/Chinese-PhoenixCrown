export type Destination = {
  id: string
  name: string
  headingRest: string
  phrase: string
  phraseNote: string
  caption: string
  roofSrc: string
  roofAlt: string
  /** pool of characters that form the hanging curtain */
  charPool: string
  /** curtain width relative to roof width */
  curtainWidth: number
  roofOverlap: number
}

export const destinations: Destination[] = [
  {
    id: 'china',
    name: 'China',
    headingRest: 'golden courtyards, silk-road myths, roofs that refuse gravity',
    phrase: '缘分 (Yuánfèn)',
    phraseNote: 'A destined meeting',
    caption:
      'Wander forbidden gardens, painted eaves, and storms older than the maps that tried to hold them.',
    roofSrc: '/images/roof-china.png',
    roofAlt: 'Traditional Chinese imperial double-tiered roof with golden tiles',
    charPool:
      '天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏闰余成岁律吕调阳云腾致雨露结为霜金生丽水玉出昆冈剑号巨阙珠称夜光果珍李柰菜重芥姜海咸河淡鳞潜羽翔龙师火帝鸟官人皇始制文字乃服衣裳推位让国有虞陶唐吊民伐罪周发殷汤坐朝问道垂拱平章爱育黎首臣伏戎羌遐迩一体率宾归王鸣凤在竹白驹食场化被草木赖及万方',
    curtainWidth: 0.72,
    roofOverlap: 26,
  },
  {
    id: 'japan',
    name: 'Japan',
    headingRest: 'red eaves in the mist, stone paths, and patience as architecture',
    phrase: '一期一会 (Ichigo ichie)',
    phraseNote: 'One time, one meeting',
    caption:
      'Pass under vermilion gates, cedar shade, and rooms where silence is part of the design.',
    roofSrc: '/images/roof-japan.png',
    roofAlt: 'Traditional Japanese temple roof in deep vermilion red',
    charPool:
      'いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす山川草木風花雪月静寂道庭寺門石苔水音光影朝夕春夏秋冬桜紅葉雨霧雲空海波松竹梅鳥虫声夢幻侘寂間縁側障子畳茶湯香灯籠鐘',
    curtainWidth: 0.68,
    roofOverlap: 22,
  },
  {
    id: 'kazakhstan',
    name: 'Kazakhstan',
    headingRest: 'steppe wind, shanyrak light, and a home that moves with you',
    phrase: 'Жол (Jol)',
    phraseNote: 'The open road',
    caption:
      'Cross grass without edge, warm felt interiors, and patterns that outrun every border.',
    roofSrc: '/images/roof-kazakh.png',
    roofAlt: 'Traditional Kazakh yurt dome with shanyrak crown',
    charPool:
      'аәбвгғдеёжзийкқлмнңоөпрстуұүфхһцчшщыіэюяАӘБГҒДЕЖЗИЙКҚЛМНҢОӨПРСТУҰҮФХЦЧШЫІдалажелкүнтаужұлдызкиізүйшаңырақжолотбасыдәстүркөшбатыр',
    curtainWidth: 0.7,
    roofOverlap: 18,
  },
]
