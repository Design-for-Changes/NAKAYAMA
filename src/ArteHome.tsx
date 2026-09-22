import { useEffect, useRef } from 'react'
import openingPhoto from './assets/nakayama/arte-heart-pasta.jpg'
import arte from './assets/nakayama/arte-logo.svg'
import brand from './assets/nakayama/brand.svg'
import pasta from './assets/nakayama/arte-pasta-making.jpg'
import dessert from './assets/nakayama/arte-experience-risotto.jpg'
import chef from './assets/nakayama/arte-people-italy.jpg'
import forest from './assets/nakayama/miyota-forest.jpg'
import './arte-home.css'

export default function ArteHome(){
 const root=useRef<HTMLDivElement>(null)
 useEffect(()=>{
  let raf=0
  const update=()=>{raf=0;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;root.current?.querySelectorAll<HTMLElement>('.arte-scroll').forEach(el=>{const p=Math.max(0,Math.min(1,-el.getBoundingClientRect().top/Math.max(1,el.offsetHeight-innerHeight)));el.style.setProperty('--journey',String(reduced?0:p))})}
  const scroll=()=>{if(!raf)raf=requestAnimationFrame(update)}
  addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll);update()
  return()=>{removeEventListener('scroll',scroll);removeEventListener('resize',scroll);cancelAnimationFrame(raf)}
 },[])
 return <div className="arte-home" ref={root}>
  <section className="opening arte-opening"><div className="opening-stage"><img src={openingPhoto} alt="紫の器に盛り付けたパスタ"/><div className="opening-wash"/><img className="opening-logo" src={arte} alt="arte LA CUCINA ITALIANA"/><p className="opening-caption">ひとときの安らぎと<br/>新たな出会いを<br/>arteで</p><span className="scroll-cue">SCROLL TO DISCOVER<span>│</span></span></div></section>
  <section className="arte-experience-full arte-heart-full arte-scroll"><div className="arte-experience-stage"><div className="arte-heart-background"><img src={pasta} alt="両手でパスタの生地を伸ばす" loading="lazy"/></div><div className="arte-copy"><span className="eyebrow">01 / THE HEART OF ARTE</span><h1>ここに来てよかった。<br/>そのひと言のために。</h1><p>日本を、北イタリアの感性で料理する。<br/>目の前の食材に向き合い、<br/>その日だけの美味しさを探す。</p><p>そして、ここでしか過ごせない時間をお届けする。<br/>それが私たちの挑戦です。</p><a className="text-link" href="#/challenge">arteの心</a></div></div></section>
  <section className="arte-experience-full arte-scroll"><div className="arte-experience-stage"><img className="arte-experience-photo" src={dessert} alt="花をあしらったリゾットと器" loading="lazy"/><div className="arte-copy"><span className="eyebrow">02 / AT OUR TABLE</span><h2>料理とともに過ごす<br/>arteの穏やかな時間</h2><p>食事を楽しみ、会話を交わす。<br/>夫婦二人で、みなさまをお迎えします。</p><a className="text-link" href="#/time">arteという体験</a><a className="arte-menu-link" href="#/course">arteのメニュー<span>ランチ・ディナー</span></a></div></div></section>
  <section className="arte-experience-full arte-people-full arte-scroll"><div className="arte-experience-stage"><img className="arte-experience-photo" src={chef} alt="イタリア時代、レストランの仲間と食卓を囲む記念写真" loading="lazy"/><div className="arte-copy"><span className="eyebrow">03 / THE PEOPLE</span><h2>二人の経験が、<br/>一つの店に。</h2><p>イタリアで料理に向き合った日々。<br/>器に触れ、人をお迎えしてきた時間。<br/>それぞれの経験を、今日の仕事に。</p><a className="text-link" href="#/people">私たちについて</a></div></div></section>
  <section className="arte-next arte-scroll"><div className="arte-next-stage"><img className="arte-next-photo" src={forest} alt="西軽井沢の森" loading="lazy"/><div className="arte-next-paper"><span className="eyebrow">FROM ARTE TO NAKAYAMA</span><div className="arte-logo-journey"><img src={arte} alt="arte"/><span>から</span><img src={brand} alt="NAKAYAMA da arte"/></div><h2>この心を、西軽井沢へ。</h2><p>変わらない料理への姿勢を、<br/>新しい水と土地で、さらに深める。</p><p className="arte-opening-date">2027年5月 移転予定</p><a className="text-link" href="#/karuizawa">西軽井沢という挑戦</a></div></div></section>
  <section className="arte-end"><a href="#/projects">プロジェクト<span>店づくりと、ともに考える人たち</span></a><a href="#/visit">ご来店・予約<span>現在のご予約は板橋店へ</span></a></section>
 </div>
}
