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
  /** dark scenes flip the page palette and glow instead of shadow */
  theme?: 'light' | 'dark'
  /** ink palette for the curtain; single-entry = uniform color */
  curtainColors?: string[]
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
  {
    id: 'fengguan',
    name: 'Fengguan',
    headingRest: 'kingfisher blue, gold filigree, and pearls that remember dynasties',
    phrase: '凤冠霞帔 (Fèngguān xiápèi)',
    phraseNote: 'The phoenix crown',
    caption:
      'Beneath point-cui feathers and strands of pearl, every blue petal was once a promise.',
    roofSrc: '/images/crown-fengguan.png',
    roofAlt: 'Ming-style phoenix crown with kingfisher-blue enamel flowers, gold filigree and pearl tassels',
    charPool:
      '凤冠霞帔金翠蓝宝珠玉花翎点翠流苏珍珠簪钗凰羽鸾鸟朝云锦绣华章璎珞垂珠銮殿宫灯烛影红妆嫁衣良辰吉时凤舞龙翔祥云瑞气琉璃翡翠玛瑙琥珀鎏金錾花累丝嵌宝步摇金钿花钿眉黛胭脂绮罗绫缎凤求凰比翼连理同心百年好合天作之合',
    curtainWidth: 0.78,
    roofOverlap: 20,
    theme: 'dark',
    // luminous inks matched to the lit crown: kingfisher blue, turquoise,
    // bright gold, pearl white
    curtainColors: ['#7d9bf0', '#5cc8e8', '#e8c46a', '#f2ecdc', '#7d9bf0', '#e8c46a'],
  },
  {
    id: 'xifeng',
    name: 'Xifeng',
    headingRest: 'stage-lit turquoise, ruby clusters, and tassels that dance with the drum',
    phrase: '梨园惊梦 (Líyuán jīngmèng)',
    phraseNote: 'A dream in the pear garden',
    caption:
      'Under the opera lamps, kingfisher clouds and pearl nets sway to a drumbeat older than the stage.',
    roofSrc: '/images/crown-opera.png',
    roofAlt: 'Chinese opera phoenix crown with turquoise cloud motifs, gold phoenixes, ruby clusters and long pearl tassel wings',
    charPool:
      '梨园惊梦戏台锣鼓水袖青衣花旦刀马武生老生净丑唱念做打生旦净末雅韵霓裳羽衣水磨腔昆曲京韵西皮二黄梆子板眼工尺曲牌折子戏出将入相粉墨登场余音绕梁字正腔圆声情并茂台上一分钟台下十年功红氍毹翎子帔靠蟒袍玉带凤目蛾眉贴片点绛唇勾脸谱亮相圆场走边趟马起霸',
    curtainWidth: 0.82,
    roofOverlap: 20,
    theme: 'dark',
    // inks pulled from the opera crown: turquoise cloud, gold phoenix,
    // ruby bead, sapphire, pearl white
    curtainColors: ['#4fc3e8', '#e8c46a', '#d4525a', '#6b8de0', '#f2ecdc', '#4fc3e8'],
  },
  {
    id: 'cuiyu',
    name: 'Cuiyu',
    headingRest: 'peacock plumes, jade dew, and gardens folded into gold',
    phrase: '翠羽明珰 (Cuìyǔ míngdāng)',
    phraseNote: 'Halcyon plumes, bright pendants',
    caption:
      'Peacock feathers curl around jade blossoms, and every pearl tassel drips with spring.',
    roofSrc: '/images/crown-jade.png',
    roofAlt: 'Jade-green phoenix crown with peacock feather motifs, jade beads, pearls and long gold tassels',
    charPool:
      '翠羽明珰孔雀开屏碧玉玲珑翡翠琉璃春水初生绿云扰扰青鸾起舞玉露金风兰叶葳蕤桂华秋皎池塘生春草园柳变鸣禽曲径通幽处禅房花木深绿竹入幽径青萝拂行衣蕉叶覆鹿松风煮茗竹雨谈诗兰亭修禊曲水流觞茂林修竹清流激湍映带左右天朗气清惠风和畅仰观宇宙俯察品类',
    curtainWidth: 0.8,
    roofOverlap: 20,
    theme: 'dark',
    // inks from the jade crown: peacock green, spring jade, gold, pearl
    curtainColors: ['#5ed49a', '#8fd6b0', '#e8c46a', '#f2ecdc', '#3fb8c9', '#5ed49a'],
  },
  {
    id: 'bingluan',
    name: 'Bingluan',
    headingRest: 'moonlit silver, frost petals, and sapphires cut from winter sky',
    phrase: '冰肌玉骨 (Bīngjī yùgǔ)',
    phraseNote: 'Skin of ice, bones of jade',
    caption:
      'Silver wings unfold like frost on glass, and sapphire hearts keep the cold light of the moon.',
    roofSrc: '/images/crown-ice.png',
    roofAlt: 'Ice-blue and silver phoenix crown with frost-petal wings, sapphires and pale pearl chains',
    charPool:
      '冰肌玉骨月明千里琼楼玉宇高处不胜寒起舞弄清影何似在人间银装素裹千树万树梨花开忽如一夜春风来北风卷地白草折胡天八月即飞雪瀚海阑干百丈冰愁云惨淡万里凝寒光照铁衣朔气传金柝雪拥��关马不前云横秦岭家何在梅须逊雪三分白雪却输梅一段香日暮苍山远天寒白屋贫柴门闻犬吠风雪夜归人',
    curtainWidth: 0.8,
    roofOverlap: 20,
    theme: 'dark',
    // inks from the ice crown: glacier blue, silver white, sapphire, pearl
    curtainColors: ['#9cc4f0', '#e4ecf7', '#4a6fd8', '#f2f0ea', '#b8d4f0', '#9cc4f0'],
  },
  {
    id: 'jinluan',
    name: 'Jinluan',
    headingRest: 'lacquer night, twin dragons, and phoenixes forged in imperial gold',
    phrase: '金銮夜宴 (Jīnluán yèyàn)',
    phraseNote: 'Night feast at the golden throne',
    caption:
      'Dragons coil through black lacquer peonies while gold phoenixes guard pearls the size of moons.',
    roofSrc: '/images/crown-gold.png',
    roofAlt: 'Black and gold imperial crown with twin dragons, gold phoenixes, black lacquer flowers and large pearls',
    charPool:
      '金銮夜宴龙腾凤翥九重宫阙紫气东来鎏金错彩黑漆描金牡丹缠枝双龙戏珠丹凤朝阳华灯初上钟鸣鼎食玉楼金殿琼浆玉液夜光杯葡萄美酒琥珀光将进酒杯莫停天生我材必有用千金散尽还复来烹羊宰牛且为乐会须一饮三百杯钟鼓馔玉不足贵但愿长醉不复醒古来圣贤皆寂寞惟有饮者留其名',
    curtainWidth: 0.82,
    roofOverlap: 20,
    theme: 'dark',
    // inks from the gold crown: imperial gold, warm brass, pearl cream
    curtainColors: ['#e8b84b', '#f2ecdc', '#c9973a', '#f7e9c4', '#e8b84b', '#d8c8a0'],
  },
  {
    id: 'jinzan',
    name: 'Jinzan',
    headingRest: 'chrysanthemum gold, peach-shell dew, and wings that trail like dawn clouds',
    phrase: '金枝玉叶 (Jīnzhī yùyè)',
    phraseNote: 'Branches of gold, leaves of jade',
    caption:
      'Ten thousand gold petals hold drops of peach shell, and pink wings sweep down like the first light of a wedding morning.',
    roofSrc: '/images/crown-bridal.png',
    roofAlt: 'Gold filigree bridal crown covered in chrysanthemum petals and pearls, with peach mother-of-pearl teardrops and long pink scale-patterned side wings',
    charPool:
      '金枝玉叶菊瓣累丝桃腮贝母十里红妆凤冠霞帔珠围翠绕花好月圆洞房花烛金玉良缘白首偕老琴瑟和鸣鸾凤和鸣秦晋之好天作之合佳偶天成郎才女貌举案齐眉相敬如宾百年好合早生贵子多子多福金玉满堂花开富贵吉祥如意龙凤呈祥双喜临门喜上眉梢红鸾星动良辰美景赏心乐事',
    curtainWidth: 0.84,
    roofOverlap: 20,
    theme: 'dark',
    // inks from the bridal crown: filigree gold, peach shell pink,
    // pearl white, pale aqua blossom
    curtainColors: ['#e8b84b', '#eda8a0', '#f2ecdc', '#a8d8d0', '#e8b84b', '#eda8a0'],
  },
]
