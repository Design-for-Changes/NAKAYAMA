import { Fragment, useEffect, useRef, useState } from 'react'
import { chapters } from './challengeContent'
import './challenge-story.css'

const assets = import.meta.glob('./assets/nakayama/*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const labels = ['土地', '食材', '響き', '乳化', 'お迎え']
const titles = [
  'イタリア料理は、\n土地とともにある。',
  'この店では、トマトを\n「彼」と呼びます。',
  '個性を活かし、\nひとつの美味しさに。',
  '状態を見きわめ、\nひとつにする。',
  'その料理を深める場所、\n西軽井沢へ。',
  'ここまで来てよかった。\nそのひと言のために。',
]
function Image({ name, alt, eager = false }: { name: string; alt: string; eager?: boolean }) {
  return <img src={assets[`./assets/nakayama/${name}`]} alt={alt} loading={eager ? 'eager' : 'lazy'} />
}
export default function ChallengeStory() {
  const root = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [inStory, setInStory] = useState(false)
  useEffect(() => {
    const sections = [...root.current!.querySelectorAll<HTMLElement>('.story-chapter')]
    const frames = [...root.current!.querySelectorAll<HTMLElement>('.story-frame')]
    let raf = 0
    const update = () => {
      raf = 0
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
      let current = 0
      sections.forEach((section, i) => { if (section.getBoundingClientRect().top <= innerHeight * .4) current = i })
      setActive(current)
      setInStory(sections[0].getBoundingClientRect().top < innerHeight * .65 && sections[sections.length - 1].getBoundingClientRect().bottom > 80)
      frames.forEach(frame => {
        const rect = frame.getBoundingClientRect()
        const p = Math.max(0, Math.min(1, -rect.top / Math.max(1, frame.offsetHeight - innerHeight)))
        frame.style.setProperty('--frame-progress', String(reduce ? 0 : p))
      })
    }
    const scroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    addEventListener('scroll', scroll, { passive: true })
    addEventListener('resize', scroll)
    update()
    return () => { removeEventListener('scroll', scroll); removeEventListener('resize', scroll); cancelAnimationFrame(raf) }
  }, [])
  const go = (i: number) => document.getElementById(`story-${i === 4 ? 5 : i}`)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  const prose = (chapter: number, start: number, end?: number) => chapters[chapter].paragraphs.slice(start, end).map((p, offset) => <Fragment key={start + offset}>
    <p data-paragraph={`${chapter}-${start + offset}`}>{p.replaceAll("NAKAYAMA", "arte")}</p>
    {chapter === 1 && start + offset === 3 && <aside className="story-citation"><span>FOOD & CULTURE</span><p>UNESCOも、イタリア料理を説明する中で、<q lang="en">respect for ingredients</q>（食材への敬意）を挙げています。</p><a href="https://ich.unesco.org/en/RL/italian-cooking-between-sustainability-and-biocultural-diversity-02093" target="_blank" rel="noopener noreferrer">UNESCOの説明を読む</a></aside>}
  </Fragment>)
  const frame = (i: number, image: string, alt: string) => <div className={`story-frame frame-${i}`}><div className="story-stage">
    <div className="frame-image"><Image name={image} alt={alt} eager={i === 0} /></div>
    <div className="frame-heading"><span className="frame-number">0{i === 5 ? 5 : i + 1}</span><span className="eyebrow">{['THE LAND', 'THE INGREDIENTS', 'THE ORCHESTRA', 'MANTECARE', 'NISHI-KARUIZAWA', 'FOR YOUR TIME'][i]}</span><h2>{titles[i]}</h2>{i===3&&<p>私たちが大切にする「乳化」。</p>}</div>
    <span className="frame-foot">arteの心 <span>0{i === 5 ? 5 : i + 1} — 05</span></span>
    <div className="frame-progress" aria-hidden="true" />
  </div></div>
  return <div className="challenge-story" ref={root}>
    <section className="story-cover"><span className="eyebrow">FIVE CHAPTERS / OUR PHILOSOPHY</span><h1>arteの心</h1><p>土地に向き合うこと。<br />目の前の食材に向き合うこと。</p><nav aria-label="5章の目次">{labels.map((label,i)=><button key={label} onClick={()=>go(i)}><span>0{i+1}</span>{label}</button>)}</nav><span className="cover-rule" /></section>
    <nav className={`story-position ${inStory?'visible':''}`} aria-label="現在の章と章移動"><span>0{active+1} / 05</span>{labels.map((label,i)=><button aria-label={`第${i+1}章 ${label}へ`} aria-current={active===i?'step':undefined} key={label} onClick={()=>go(i)}><span>{label}</span></button>)}</nav>
    <article className="story-chapter land-chapter" id="story-0">
      {frame(0,'hand-pasta.jpg','日々の手打ちパスタ')}
      <div className="story-reading land-reading"><div className="story-lead">{prose(0,0,1)}</div><div className="prose-column">{prose(0,1,7)}</div></div>
      <div className="land-ending"><span className="eyebrow">AT ARTE</span><p>イタリアで培った感覚を、板橋のarteでの日々の仕事に。目の前の食材から、美味しさを考えます。</p></div>
    </article>
    <article className="story-chapter ingredient-chapter" id="story-1">
      {frame(1,'touch-dough.jpg','食材の状態を手で確かめる')}
      <div className="ingredient-reading"><div className="prose-column">{prose(1,0,4)}</div><figure><Image name="hands-hero.jpg" alt="厨房で食材と向き合う手元"/><figcaption>触れて、確かめる。</figcaption></figure><div className="prose-column ingredient-rest">{prose(1,4)}</div></div>
    </article>
    <article className="story-chapter orchestra-chapter" id="story-2">
      {frame(2,'arte-orchestra-pasta.jpg','白い器にソースと食材を重ねたパスタ')}
      <div className="orchestra-reading"><div className="orchestra-keywords" aria-hidden="true"><span>香り</span><span>味わい</span><span>余韻</span></div><div className="prose-column">{prose(2,0,3)}</div><figure><Image name="arte-orchestra-dessert.jpg" alt="白い器に花とソースをあしらったデザート"/></figure><div className="prose-column">{prose(2,3)}</div></div>
    </article>
    <article className="story-chapter craft-chapter" id="story-3">
      {frame(3,'arte-mantecare-pasta.jpg','木のボードに並ぶ手作りの詰め物パスタ')}
      <div className="craft-reading"><div className="prose-column">{prose(3,0,4)}</div><div className="craft-pair"><figure><Image name="chef-kitchen.jpg" alt="厨房での仕上げの仕事"/></figure><div className="prose-column">{prose(3,4,6)}</div></div><div className="prose-column">{prose(3,6)}<aside className="story-citation"><p>mantecareの語義参照：<a href="https://www.treccani.it/vocabolario/mantecare/" target="_blank" rel="noopener noreferrer">Treccani</a>。山田錦の詳しい選択理由は、中山さんへの確認後に追記します。</p></aside></div></div>
    </article>
    <article className="story-chapter welcome-chapter" id="story-5">
      {frame(5,'arte-welcome-hands.jpg','両手を添えてパスタの生地を確かめる')}
      <div className="welcome-reading"><div className="prose-column">{prose(5,0,3)}</div><div className="welcome-experience">{prose(5,8,10)}</div></div>
    </article>
  </div>
}
