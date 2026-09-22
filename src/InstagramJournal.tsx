import './instagram-journal.css'
const assets = import.meta.glob('./assets/nakayama/journal-*.jpg', { eager: true, query: '?url', import: 'default' }) as Record<string,string>
type Entry = {id:string;date:string;category:string;title:string;paragraphs:string[];images:string[][];embed:boolean}
// Japanese caption excerpts: original wording retained, line breaks/punctuation adjusted.
// Supplied album images illustrate the topic, not necessarily the original Instagram media.
// Posting dates and construction chronology are not inferred from album filenames.
const entries:Entry[] = [
  {
    "id": "DZ7ODiLSszz",
    "date": "2026-06-23",
    "category": "生産者",
    "title": "美味しい理由を確かめに。",
    "paragraphs": [
      "美味しい理由を確かめに、日本一標高の高い長野県の生産者さんと信州のワインを訪ねてきました。",
      "手仕事と、こだわり。やっぱり美味しさは、人がつくるもの。",
      "考えて、試して、失敗を重ねて。そうして生まれた味わいは、偶然ではない…",
      "直接お話しをお伺いし、そして感じたことで、少しずつ確信に変わっていく。私たちのレストランも、きっと同じ。"
    ],
    "images": [],
    "embed": true
  },
  {
    "id": "DbISicwEhyu",
    "date": "2026-07-23",
    "category": "生産者",
    "title": "小川村で出会った、宝箱のような場所。",
    "paragraphs": [
      "長野県小川村で出会った、宝箱のような場所。",
      "サンマルツァーノ、パレルモ……珍しいEUR野菜やフルーツに溢れていました。",
      "シェフの目が輝いた、本場さながらの美しい色彩。このご縁に、心から感謝します。"
    ],
    "images": [
      [
        "journal-ogawa-8.jpg",
        "小川村グランジャの畑を訪ねて"
      ],
      [
        "journal-ogawa-12.jpg",
        "畑で出会った野菜"
      ],
      [
        "journal-ogawa-3.jpg",
        "小川村グランジャ訪問の記念写真"
      ]
    ],
    "embed": false
  },
  {
    "id": "DcKnMdRkjO7",
    "date": "2026-08-18",
    "category": "店づくり",
    "title": "4周年。その先へ。",
    "paragraphs": [
      "arteは、おかげさまで4周年を迎えました。",
      "ここまで歩んでこられたこと、支えてくださった皆さまに、心から感謝しています。",
      "そして、ここから少しずつ。新しい時間が、静かに動き始めています…"
    ],
    "images": [
      [
        "journal-forest.jpg",
        "現地伐採前の森／2026年7月6日の記録"
      ]
    ],
    "embed": false
  },
  {
    "id": "DcS2_wVkqj5",
    "date": "2026-08-21",
    "category": "土地・建築",
    "title": "まだ、何もない場所から。",
    "paragraphs": [
      "少しずつ、景色が変わり始めています。",
      "まだ、何もない場所から。"
    ],
    "images": [
      [
        "journal-site-4.jpg",
        "定点撮影より／木々の間に広がる敷地"
      ]
    ],
    "embed": false
  },
  {
    "id": "DchczGqyfAW",
    "date": "2026-08-27",
    "category": "お知らせ",
    "title": "板橋から、浅間山麓へ。",
    "paragraphs": [
      "東京 板橋のarteで、皆さまと重ねてきた時間は、私たちにとって何にも代えがたい宝物です。",
      "だからこそ、これからお迎えする一日一日も、変わらず、丁寧に重ねてまいります。",
      "そして新しい場所でも、皆さまの大切な一日を託していただける店であるために。日常を少し離れ、心ほどけるひとときをお届けできる場所となるために。",
      "板橋で皆さまに育てていただいたarteを、浅間山麓の新しい景色へとつないでまいります。"
    ],
    "images": [],
    "embed": false
  },
  {
    "id": "DcyHZQyyG4Y",
    "date": "2026-09-02",
    "category": "土地・建築",
    "title": "木々に覆われていた場所が、新しい景色へ。",
    "paragraphs": [
      "ここから、レストランができるまで。",
      "木々に覆われていた場所が、切って、掘って、整えて、少しずつ新しい景色へ。"
    ],
    "images": [
      [
        "journal-site-1.jpg",
        "定点撮影より／重機による現地の作業"
      ],
      [
        "journal-site-7.jpg",
        "定点撮影より／木々が整理された敷地"
      ]
    ],
    "embed": false
  },
  {
    "id": "Dc0OBohEp7m",
    "date": "2026-09-03",
    "category": "店づくり",
    "title": "あの時も、ここから始まりました。",
    "paragraphs": [
      "5年前。ふたりしてわからないことばかりで、毎日がただ必死でした。",
      "たくさんの方に支えていただき、気づけば5年目。",
      "東京arteで過ごす時間が、皆さまにとって心豊かなひとときになれたら。残りの時間も、ひとつひとつ大切に。",
      "そして…あんなに大変だったのに、私たち、また始めてしまうんです（笑）"
    ],
    "images": [],
    "embed": false
  },
  {
    "id": "DdFeVUIktg-",
    "date": "2026-09-10",
    "category": "土地・建築",
    "title": "いよいよ、基礎工事が始まりました。",
    "paragraphs": [
      "写真は「丁張り」という工程。これから基礎が出来上がります。",
      "少し前まで森だったこの場所に、少しずつ建物の輪郭が見えてきました。",
      "ここから、いよいよ形になっていきます。"
    ],
    "images": [],
    "embed": true
  },
  {
    "id": "DdTIQKZEt7_",
    "date": "2026-09-15",
    "category": "器・作り手",
    "title": "器と料理。二人の仕事が出会うまで。",
    "paragraphs": [
      "新しいarteの器をお願いしている作り手のひとり、陶工・堅田貴治氏を訪ねて、高知へ。",
      "土に触れ、まだ見えない、かたちを探す。納得できなければ、静かに土へ還し、また、はじめから。何度でも、轆轤をひく。",
      "山に入り、その土地に眠る素材を探し、釉薬を生み出す。理想の色に出会うまで、幾度となく、試みを重ねて。",
      "研究者であり、職人。そのひたむきな姿に、arteの厨房に立つもうひとりの職人と重なりました。",
      "器と料理。歩んできた道は違っても、その根に流れるものは、きっと同じ。基本に立ち返り、ひとつずつ、積み重ねていく。",
      "やがて、二人の仕事が一枚の器の上で出会う日まで。"
    ],
    "images": [],
    "embed": true
  },
  {
    "id": "DdfRgzzSlGR",
    "date": "2026-09-20",
    "category": "店づくり",
    "title": "新しいarteができるまで。",
    "paragraphs": [
      "新しいarteができるまで、一緒に見届けていただけますか。"
    ],
    "images": [],
    "embed": true
  }
]
export function InstagramPost({id,title}:{id:string,title:string}) {
 const url=`https://www.instagram.com/p/${id}/`
 return <div className="instagram-post">
  <div className="instagram-embed"><iframe src={`${url}embed/`} title={title+' — Instagram投稿'} loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/></div>
  <a className="journal-source" href={url} target="_blank" rel="noopener noreferrer">Instagramで原投稿を見る（別タブ）</a>
 </div>
}
export default function InstagramJournal(){
 return <section className="instagram-journal" aria-labelledby="journal-title">
  <div className="instagram-journal-intro"><span className="eyebrow">BUILDING OUR RESTAURANT</span><h2 id="journal-title">店づくりの記録</h2><p>土地を整え、生産者を訪ね、器を選ぶ。<br/>新しい店へとつながる日々。</p><small>本文はInstagramの投稿から抜粋し、改行・句読点を整えています。写真はお寄せいただいた記録もあわせて掲載しています。日付は日本時間の投稿日で、撮影日とは異なります。</small></div>
  <div className="journal-timeline">
  {entries.map((entry)=><article className={'journal-story '+(entry.images.length||entry.embed?'has-media':'text-only')} key={entry.id}>
   <div className="journal-date"><small>投稿日</small><time dateTime={entry.date}>{entry.date.replaceAll('-', '.')}</time></div><div className="journal-event"><div className="journal-story-copy"><span className="eyebrow">{entry.category}</span><h3>{entry.title}</h3>{entry.paragraphs.map(p=><p key={p}>{p}</p>)}<a className="journal-source" href={`https://www.instagram.com/p/${entry.id}/`} target="_blank" rel="noopener noreferrer">Instagramで原文を読む（別タブ）</a></div>
   {entry.images.length>0?<div className="journal-story-photos">{entry.images.map(([name,caption])=><figure key={name}><img src={assets[`./assets/nakayama/${name}`]} alt={caption} loading="lazy"/><figcaption>{caption}</figcaption></figure>)}</div>:entry.embed?<InstagramPost id={entry.id} title={entry.title}/>:null}
  </div></article>)}
  </div>
 </section>
}
