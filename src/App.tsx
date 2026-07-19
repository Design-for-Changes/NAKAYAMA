import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import brand from './assets/nakayama/brand.svg'
import handsHero from './assets/nakayama/hands-hero.jpg'
import handsWork from './assets/nakayama/hands-work.jpg'
import risotto from './assets/nakayama/risotto.jpg'
import tortellini from './assets/nakayama/tortellini.jpg'
import agnolotti from './assets/nakayama/agnolotti.jpg'
import miyotaForest from './assets/nakayama/miyota-forest.jpg'
import projectMeeting from './assets/nakayama/project-meeting.jpg'
import chefTomohide from './assets/nakayama/chef-tomohide.png'
import chefKitchen from './assets/nakayama/chef-kitchen.jpg'
import touchDough from './assets/nakayama/touch-dough.jpg'
import asamaWinter from './assets/nakayama/asama-winter.jpg'
import asamaRoad from './assets/nakayama/asama-road.jpg'
import miyotaSite from './assets/nakayama/miyota-site.jpg'
import miyotaBirch from './assets/nakayama/miyota-birch.jpg'
import handPasta from './assets/nakayama/hand-pasta.jpg'
import pannacotta from './assets/nakayama/pannacotta.jpg'
import bisquePasta from './assets/nakayama/bisque-pasta.jpg'
import appleDessert from './assets/nakayama/apple-dessert.jpg'

type PageId = 'home' | 'cucina' | 'chef' | 'experience' | 'course' | 'projects' | 'visit' | 'reserve'

const pages: Record<string, PageId> = {
  '/': 'home',
  '/cucina': 'cucina',
  '/chef': 'chef',
  '/experience': 'experience',
  '/course': 'course',
  '/projects': 'projects',
  '/visit': 'visit',
  '/reserve': 'reserve',
}

const navigation: Array<{ id: PageId; href: string; label: string }> = [
  { id: 'cucina', href: '#/cucina', label: 'NAKAYAMAの挑戦' },
  { id: 'chef', href: '#/chef', label: 'シェフ紹介' },
  { id: 'experience', href: '#/experience', label: 'NAKAYAMAでの体験' },
  { id: 'course', href: '#/course', label: 'コース' },
  { id: 'projects', href: '#/projects', label: 'プロジェクト' },
  { id: 'visit', href: '#/visit', label: 'ご来店案内' },
]

const routeFromHash = () => pages[window.location.hash.slice(1) || '/'] ?? 'home'

function App() {
  const [page, setPage] = useState<PageId>(routeFromHash)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openingComplete, setOpeningComplete] = useState(false)

  useContinuousScrollMotion(page)

  useEffect(() => {
    const onHashChange = () => {
      setPage(routeFromHash())
      setMenuOpen(false)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen)
    return () => document.body.classList.remove('menu-is-open')
  }, [menuOpen])

  return (
    <div className="site-shell">
      {page !== 'visit' && page !== 'reserve' && <ScrollProgress />}
      {page !== 'visit' && page !== 'reserve' && <NatureParticles />}
      <Header
        page={page}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        homeMode={page === 'home'}
        openingComplete={openingComplete}
      />
      <main id="main-content" className="page-enter" key={page}>
        {page === 'home' && <HomePage onOpeningProgress={setOpeningComplete} />}
        {page === 'cucina' && <CuisinePage />}
        {page === 'chef' && <ChefPage />}
        {page === 'experience' && <ExperiencePage />}
        {page === 'course' && <CoursePage />}
        {page === 'projects' && <ProjectsPage />}
        {page === 'visit' && <VisitPage />}
        {page === 'reserve' && <ReservePage />}
      </main>
      <Footer />
    </div>
  )
}

function Header({
  page,
  menuOpen,
  setMenuOpen,
  homeMode,
  openingComplete,
}: {
  page: PageId
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  homeMode: boolean
  openingComplete: boolean
}) {
  return (
    <header className={`site-header ${homeMode ? 'is-home-header' : ''} ${homeMode && !openingComplete ? 'is-opening' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <a className="brand-link" href="#/" aria-label="NAKAYAMA da arte ホーム">
        <img src={brand} alt="NAKAYAMA da arte" />
      </a>

      <nav className="desktop-nav" aria-label="メインナビゲーション">
        {navigation.map((item) => (
          <a key={item.id} href={item.href} aria-current={page === item.id ? 'page' : undefined}>
            {item.label}
          </a>
        ))}
        <a className="reserve-link" href="#/reserve" aria-current={page === 'reserve' ? 'page' : undefined}>
          ご予約
        </a>
      </nav>

      <button
        className="menu-button"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
      </button>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="モバイルナビゲーション">
          <a href="#/" aria-current={page === 'home' ? 'page' : undefined}>ホーム</a>
          {navigation.map((item) => (
            <a key={item.id} href={item.href} aria-current={page === item.id ? 'page' : undefined}>
              {item.label}
            </a>
          ))}
          <a href="#/reserve" aria-current={page === 'reserve' ? 'page' : undefined}>ご予約</a>
        </nav>
      </div>
    </header>
  )
}

function HomePage({ onOpeningProgress }: { onOpeningProgress: (complete: boolean) => void }) {
  return (
    <>
      <HomeOpening onProgress={onOpeningProgress} />

      <section className="statement section-pad">
        <p className="eyebrow">SHINSHU THROUGH NORTHERN ITALIAN SENSIBILITY</p>
        <h2>信州を、北イタリアの感性で料理する。</h2>
        <div className="statement-copy">
          <p>イタリアで15年間培った感覚を、御代田の水、季節、そこで出会う食材へ。決まった形を繰り返すのではなく、届いたものに触れ、温度を見つめ、その日の最もよい状態を探します。</p>
          <TextLink href="#/cucina">NAKAYAMAの挑戦を読む</TextLink>
        </div>
      </section>

      <ScrollStory />

      <section className="fact-strip" aria-label="店舗の概要">
        <div><strong>15</strong><span>YEARS IN ITALY</span></div>
        <div><strong>10</strong><span>SEATS</span></div>
        <div><strong>1</strong><span>SERVICE EACH NIGHT</span></div>
      </section>

      <section className="feature-split section-pad">
        <div className="feature-copy">
          <p className="eyebrow">THE COURSE</p>
          <h2>その日に届いたものから、夜の流れを組み立てる。</h2>
          <p>お料理は、おまかせのコースでご用意します。内容も順番も、素材の状態や季節に応じて変わります。</p>
          <TextLink href="#/course">コースのご案内</TextLink>
        </div>
        <img src={bisquePasta} alt="ビスクソースと赤海老を合わせた手打ちパスタ" />
      </section>

      <section className="miyota-feature">
        <img src={miyotaForest} alt="御代田の木立に差し込む光" />
        <div className="miyota-overlay">
          <p className="eyebrow">THE MOVE TO MIYOTA</p>
          <h2>料理の根を、土地へおろす。</h2>
          <p>イタリア料理の本質をさらに深く追うために選んだ、御代田という場所。食事の時間は、自然のなかから始まります。</p>
          <TextLink href="#/projects">御代田に店をひらくまで</TextLink>
        </div>
      </section>

      <section className="project-teaser section-pad">
        <div>
          <p className="eyebrow">NAKAYAMA DA ARTE × SHIBAURA INSTITUTE OF TECHNOLOGY</p>
          <h2>自らを見つめ直し、問い直す。</h2>
        </div>
        <div>
          <p>御代田への移転を機に、店の歩みと料理への考えを、対話を通して捉え直すプロジェクト。NAKAYAMAらしさを言葉と形にしていきます。</p>
          <TextLink href="#/projects">プロジェクトを見る</TextLink>
        </div>
      </section>

      <ReservationCta />
    </>
  )
}

function HomeOpening({ onProgress }: { onProgress: (complete: boolean) => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const section = sectionRef.current
        if (!section) return
        const rect = section.getBoundingClientRect()
        const distance = section.offsetHeight - window.innerHeight
        const next = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0
        setProgress(next)
        onProgress(next >= 0.27)
      })
    }
    const resize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
      update()
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', resize)
    }
  }, [onProgress])

  const shift = Math.min(1, Math.max(0, progress / 0.27))
  const reveal = Math.min(1, Math.max(0, (progress - 0.13) / 0.27))
  const copyReveal = Math.min(1, Math.max(0, (progress - 0.42) / 0.28))
  const desktop = viewport.width >= 1180
  const initialWidth = Math.min(viewport.width * 0.58, 260)
  const targetWidth = desktop ? 148 : 126
  const targetLeft = desktop ? viewport.width * 0.04 : 20
  const targetTop = desktop ? 22 : 16
  const logoStyle = {
    left: initialWidth ? viewport.width / 2 + (targetLeft - viewport.width / 2) * shift : '50%',
    top: viewport.height / 2 + (targetTop - viewport.height / 2) * shift,
    width: initialWidth + (targetWidth - initialWidth) * shift,
    transform: `translate(${-50 * (1 - shift)}%, ${-50 * (1 - shift)}%)`,
    opacity: 1 - Math.min(1, Math.max(0, (progress - 0.245) / 0.035)),
  }

  return (
    <section className="home-opening" ref={sectionRef} aria-label="NAKAYAMA da arte">
      <div className="home-opening-sticky">
        <img className="opening-photo" src={handsHero} alt="手のひらにのせた手打ちパスタ" style={{ opacity: reveal, transform: `scale(${1.08 - reveal * 0.08})` }} />
        <div className="opening-shade" style={{ opacity: reveal }} />
        <div className="opening-panel opening-panel-top" style={{ transform: `translateY(${-100 * reveal}%)` }} />
        <div className="opening-panel opening-panel-bottom" style={{ transform: `translateY(${100 * reveal}%)` }} />
        <div className="opening-logo" style={logoStyle} aria-hidden={shift > 0.9}>
          <img src={brand} alt="NAKAYAMA da arte" />
        </div>
        <div className="opening-copy" style={{ opacity: copyReveal, transform: `translateY(${28 * (1 - copyReveal)}px)` }}>
          <p className="eyebrow">NAKAYAMA DA ARTE / MIYOTA, NAGANO</p>
          <h1>浅間山のふもと、<br />席が10だけのイタリア料理店。</h1>
          <p className="lead">完全予約制で、営業は夜、一日一回。夫婦二人で、目の前の食材と向き合いながら、その日だけのコースを仕立てます。</p>
        </div>
        <p className="opening-scroll" style={{ opacity: 1 - Math.min(1, progress * 8) }}>SCROLL TO ENTER <span>↓</span></p>
      </div>
    </section>
  )
}

function CuisinePage() {
  return (
    <>
      <PageHero eyebrow="OUR CHALLENGE" title="NAKAYAMAの挑戦" image={touchDough} alt="生地の状態を指先で確かめる手元" />

      <section className="intro-grid section-pad">
        <p className="eyebrow">COOKING WITH WHAT IS HERE, TODAY</p>
        <div>
          <h2>食材が届いてから、考える。</h2>
          <p className="large-copy">同じ種類の食材でも、大きさも、水分も、香りも、その日の状態も違います。だから、いつも同じ作り方にはなりません。</p>
          <p>手で触れ、火の入り方を見つめ、どこで次の工程へ進むかを決める。レシピを土台にしながらも、目の前にあるものが最もよくなる方法を探します。</p>
        </div>
      </section>

      <section className="process-section section-pad">
        <div className="section-heading">
          <p className="eyebrow">THREE CONTINUOUS DECISIONS</p>
          <h2>料理のあいだ、判断は止まらない。</h2>
          <p className="swipe-hint">指で横へスワイプ</p>
        </div>
        <div className="process-rail" aria-label="料理で大切にしている三つの判断">
          <article>
            <span>01 / TOUCH</span>
            <h3>触れて、確かめる。</h3>
            <p>水分、弾力、温度。手から伝わる小さな違いを、次の判断につなげます。</p>
          </article>
          <article>
            <span>02 / TEMPERATURE</span>
            <h3>変化を、見続ける。</h3>
            <p>火にかけたあとも、状態は刻々と変わります。仕上がるまで目を離しません。</p>
          </article>
          <article>
            <span>03 / TIMING</span>
            <h3>瞬間を、選ぶ。</h3>
            <p>次へ進む一秒は、毎日同じではありません。その日の最もよい瞬間を選びます。</p>
          </article>
        </div>
      </section>

      <section className="editorial-block dark-section">
        <div className="editorial-image"><img src={risotto} alt="甲殻類の旨みを閉じ込めたイカスミのリゾット" /></div>
        <div className="editorial-copy">
          <p className="eyebrow">MANTECARE</p>
          <h2>温度を、見続ける。</h2>
          <p>ソースと素材をちょうどよく結びつけ、なめらかな一体感へ導く。そのためには、温度と水分の小さな変化を見逃せません。仕上がる瞬間まで、鍋のなかと向き合い続けます。</p>
          <p>リゾットには、酒米の山田錦を使うこともあります。その粘りと芯の残り方を活かし、イタリアで身につけた技術を、日本の素材で組み立て直しています。</p>
        </div>
      </section>

      <section className="dish-section section-pad">
        <div className="section-heading">
          <p className="eyebrow">FROM THE KITCHEN</p>
          <h2>これまでの料理から</h2>
        </div>
        <p className="swipe-hint">横にスワイプ。写真をタップすると大きく表示します。</p>
        <DishGallery />
      </section>

      <section className="text-columns section-pad border-top">
        <div>
          <p className="eyebrow">FIFTEEN YEARS IN ITALY</p>
          <h2>土地の料理として、イタリア料理を学ぶ。</h2>
        </div>
        <div>
          <p>イタリアで過ごした15年に学んだのは、料理を土地から切り離さないことでした。その地域の気候や水、そこで育つものに向き合うことが、その場所でしか生まれない味につながります。</p>
          <p>調味料に頼りすぎず、一つひとつの素材がもつ役割を引き出す。御代田でも、素材同士が無理なく響き合う料理を目指します。</p>
        </div>
      </section>

      <section className="text-columns section-pad border-top">
        <div>
          <p className="eyebrow">HOSPITALITY</p>
          <h2>料理だけでは、完成しない。</h2>
        </div>
        <div>
          <p>器、ワイン、テーブル、言葉を交わす間合い。夫婦二人でつくる小さな店だからこそ、厨房と客席を分けず、ひとつの時間として整えていきます。</p>
        </div>
      </section>

      <ReservationCta />
    </>
  )
}

function ChefPage() {
  return (
    <>
      <PageHero eyebrow="THE CHEF" title="中山友秀" image={chefTomohide} alt="シェフ 中山友秀" portrait />

      <section className="chef-intro section-pad">
        <div>
          <p className="eyebrow">TOMOHIDE NAKAYAMA / CHEF TOMO</p>
          <h2>料理人として26年以上。<br />そのうち15年を、イタリアで。</h2>
        </div>
        <div>
          <p className="large-copy">料理を、技術としてだけでなく、土地や家族、季節と結びついた文化として身につけてきました。</p>
          <p>現地の料理人と働き、イタリアの客へ料理をつくり、料理長として店の味と厨房に責任を持つ。その日々で培った判断を、いま目の前にある日本の食材へ向けています。</p>
        </div>
      </section>

      <section className="chef-years dark-section">
        <div className="chef-years-copy">
          <p className="eyebrow">FIFTEEN YEARS IN ITALY</p>
          <h2>外から眺めるのではなく、文化の内側で学ぶ。</h2>
          <p>2006年にイタリアへ。ピエモンテ、トスカーナ、エミリア＝ロマーニャの厨房で経験を重ねました。地方ごとに料理が違う理由を、日々の仕事と暮らしのなかで知りました。</p>
        </div>
        <img src={chefKitchen} alt="厨房で手打ちパスタを仕立てる中山友秀" />
      </section>

      <section className="career section-pad">
        <div className="section-heading">
          <p className="eyebrow">CAREER</p>
          <h2>歩み</h2>
        </div>
        <ol className="career-timeline">
          <li><time>2000</time><div><h3>料理人としての出発</h3><p>服部栄養専門学校を卒業。東京・広尾「アッカ」などで修業を重ねる。</p></div></li>
          <li><time>2006</time><div><h3>イタリアへ</h3><p>ピエモンテ州「ラ・チャウ・デル・トルナヴェント」など、各地の厨房で働く。</p></div></li>
          <li><time>2012</time><div><h3>Hotel Il Pellicano</h3><p>トスカーナ州の二つ星「ホテル イル ペリカーノ」で、パスタ場のシェフを務める。</p></div></li>
          <li><time>2013</time><div><h3>Piacenza</h3><p>ピアチェンツァの老舗レストランでシェフに就任。現地スタッフを率い、店の味と運営を担う。</p></div></li>
          <li><time>2021</time><div><h3>15年を経て帰国</h3><p>日本へ戻り、翌2022年8月、東京・板橋に「arte」を開く。</p></div></li>
          <li><time>2027</time><div><h3>御代田へ</h3><p>土地と食材に向き合うイタリア料理をさらに深めるため、浅間山のふもとへ。</p></div></li>
        </ol>
      </section>

      <section className="two-people section-pad">
        <div>
          <p className="eyebrow">TOMO & RIKAKO</p>
          <h2>二人で、ひとつのレストランをつくる。</h2>
        </div>
        <div>
          <h3>中山理香子</h3>
          <p>20年以上、器、食卓、客を迎える時間に携わってきました。全国の窯から料理に合う器を選び、必要ならばつくり手とともに新しい器を考える。料理、器、空間、サービスを、一つの食事の時間へ整えます。</p>
          <p>夫婦二人の小さな店だからこそ、厨房と客席を分けず、その日にしか生まれない時間を丁寧に届けます。</p>
          <TextLink href="#/cucina">二人が続ける挑戦</TextLink>
        </div>
      </section>

      <ReservationCta />
    </>
  )
}

function CoursePage() {
  return (
    <>
      <PageTitle eyebrow="THE COURSE" title="コースのご案内" intro="その日の食材から組み立てる、おまかせのコースをご用意しています。" />

      <section className="course-visual section-pad">
        <img src={appleDessert} alt="信州の林檎とキャラメルを使ったドルチェ" />
      </section>

      <section className="course-details section-pad">
        <div className="section-heading">
          <p className="eyebrow">DINNER</p>
          <h2>おまかせコース</h2>
          <p>一皿ごとの内容や順番は、季節と食材の状態に応じて変わります。料金と当日の詳しい内容は、ご予約時にご確認いただけます。</p>
        </div>
        <dl className="detail-list">
          <div><dt>営業</dt><dd>夜、一日一回</dd></div>
          <div><dt>席数</dt><dd>最大10席</dd></div>
          <div><dt>ご予約</dt><dd>完全予約制</dd></div>
          <div><dt>料金</dt><dd>ご予約時にご確認ください</dd></div>
          <div><dt>お飲み物</dt><dd>コースに合わせてご案内します</dd></div>
          <div><dt>所要時間</dt><dd>ご予約時にご確認ください</dd></div>
        </dl>
      </section>

      <section className="nature-course section-pad">
        <img src={miyotaBirch} alt="光が差し込む御代田の白樺林" />
        <div>
          <p className="eyebrow">FROM OUTSIDE TO THE TABLE</p>
          <h2>自然のなかから始まる、食事の時間。</h2>
          <p>まずは外で、食前酒と小さな前菜を。そこから店内へ移り、コースを味わいます。御代田の空気や季節を、料理の前から感じていただくための時間です。</p>
          <p className="note">天候や季節に応じて、内容は変更となる場合があります。</p>
        </div>
      </section>

      <section className="notice section-pad border-top">
        <p className="eyebrow">BEFORE YOUR VISIT</p>
        <h2>アレルギー・苦手な食材について</h2>
        <p>ご予約時にご相談ください。食材の構成上、対応が難しい場合もございます。</p>
      </section>

      <ReservationCta />
    </>
  )
}

const experienceFrames = [
  {
    image: asamaWinter,
    alt: '御代田から望む冬の浅間山',
    label: 'ARRIVAL',
    number: '01',
    title: '浅間山のふもとへ。',
    body: '旅の目的地として御代田へ。木々の気配と、その日の空気のなかから、食事の時間が始まります。',
  },
  {
    image: tortellini,
    alt: '赤海老とリコッタチーズのトルテッリーニ',
    label: 'APERITIVO',
    number: '02',
    title: 'まずは、外でひと口。',
    body: '食前酒と小さな前菜を外で楽しみ、季節と土地へ感覚をひらいてから、店内へ進みます。',
  },
  {
    image: bisquePasta,
    alt: 'ビスクソースと赤海老を合わせた手打ちパスタ',
    label: 'AT THE TABLE',
    number: '03',
    title: '十の席で、その夜のコースを。',
    body: '営業は夜、一日一回。届いた食材から組み立てた料理を、夫婦二人で一組ずつの客へ届けます。',
  },
  {
    image: appleDessert,
    alt: '信州の林檎とキャラメルを使ったドルチェ',
    label: 'AFTERGLOW',
    number: '04',
    title: '余韻を、旅の記憶に。',
    body: '味だけでなく、器、光、言葉を交わした時間まで。帰路にも残るひと晩を目指します。',
  },
]

function ExperiencePage() {
  return (
    <>
      <PageTitle
        eyebrow="YOUR EVENING AT NAKAYAMA"
        title="NAKAYAMAでの体験"
        intro="お客様が御代田へ到着してから、食事の余韻とともに帰るまで。NAKAYAMAで過ごす、ひと晩の流れをご紹介します。"
      />
      <ExperienceJourney />

      <section className="experience-notes section-pad">
        <div>
          <p className="eyebrow">A SMALL RESTAURANT</p>
          <h2>すべての時間を、夫婦二人で。</h2>
        </div>
        <div>
          <p>一度にお迎えできるのは最大10席。効率よりも手仕事を大切にし、厨房から客席まで、ひとつながりの時間として整えます。</p>
          <dl className="experience-facts">
            <div><dt>DINNER</dt><dd>夜、一日一回</dd></div>
            <div><dt>SEATS</dt><dd>最大10席</dd></div>
            <div><dt>RESERVATION</dt><dd>完全予約制</dd></div>
          </dl>
        </div>
      </section>

      <section className="experience-planning section-pad border-top">
        <p className="eyebrow">SEASON & WEATHER</p>
        <h2>御代田の季節に合わせて。</h2>
        <p>屋外で始まるご案内は、季節や天候に応じて変わります。雨天や厳冬期には、店内から食事の時間を始めることがあります。</p>
        <TextLink href="#/course">コースのご案内</TextLink>
      </section>

      <ReservationCta />
    </>
  )
}

function ExperienceJourney() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const section = sectionRef.current
        if (!section) return
        const rect = section.getBoundingClientRect()
        const distance = section.offsetHeight - window.innerHeight
        setProgress(distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const position = progress * (experienceFrames.length - 1)
  const activeFrame = Math.round(position)

  return (
    <section className="experience-journey" ref={sectionRef} aria-label="御代田で過ごすひと晩の流れ">
      <div className="experience-sticky">
        <div className="experience-images" aria-hidden="true">
          {experienceFrames.map((item, index) => (
            <img
              key={item.label}
              src={item.image}
              alt=""
              style={{ opacity: Math.max(0, 1 - Math.abs(position - index)) }}
            />
          ))}
        </div>
        <div className="experience-shade" />
        <div className="experience-copy">
          <div className="experience-count"><strong>{experienceFrames[activeFrame].number}</strong><span>/ 04</span></div>
          <div className="experience-words" aria-live="polite">
            <article className="is-active" key={experienceFrames[activeFrame].label}>
              <p className="eyebrow">{experienceFrames[activeFrame].label}</p>
              <h2>{experienceFrames[activeFrame].title}</h2>
              <p>{experienceFrames[activeFrame].body}</p>
            </article>
          </div>
        </div>
        <div className="experience-track" aria-hidden="true"><span style={{ transform: `scaleY(${progress})` }} /></div>
        <img className="story-accessible-image" src={experienceFrames[activeFrame].image} alt={experienceFrames[activeFrame].alt} />
      </div>
    </section>
  )
}

function ProjectsPage() {
  return (
    <>
      <PageTitle eyebrow="PROJECTS" title="プロジェクト" intro="御代田に店をひらくまでの過程も、NAKAYAMAの営みの一部です。土地と向き合うこと、自分たちの原点を問い直すこと。その記録と、現在進行する試みを紹介します。" />

      <article className="project-story project-story-forest">
        <div className="project-story-image"><img src={miyotaSite} alt="御代田の新しい店の建設地" /></div>
        <div className="project-story-copy">
          <p className="eyebrow">PROJECT 01 / MIYOTA</p>
          <h2>御代田に店をひらくまで</h2>
          <p>イタリア料理の本質をさらに深く追うために、料理が土地とつながる環境を探してきました。たどり着いたのが、浅間山のふもとにある御代田です。</p>
          <p>水が変わると、パスタも、料理も、コーヒーも変わる。日々触れる水と食材から、その場所でしか生まれない味を探していきます。</p>
          <dl className="project-meta"><div><dt>場所</dt><dd>長野県御代田町</dd></div><div><dt>移転</dt><dd>2027年</dd></div></dl>
        </div>
      </article>

      <article className="project-story project-story-research">
        <div className="project-story-image"><img src={projectMeeting} alt="テーブルを囲み、店のあり方を考えるプロジェクトの様子" /></div>
        <div className="project-story-copy">
          <p className="eyebrow">PROJECT 02 / RESEARCH</p>
          <h2>自らを見つめ直し、問い直す。</h2>
          <p className="project-partner">NAKAYAMA da arte × 芝浦工業大学</p>
          <p>御代田への移転を機に、これまでの歩み、料理への考え、二人が大切にしてきたことを、対話を通して捉え直しました。</p>
          <p>答えを外から与えるのではなく、店のなかにすでにあるものを見つけ、問い、言葉と形にしていくプロジェクトです。このウェブサイトも、その過程から生まれました。</p>
        </div>
      </article>

      <ReservationCta />
    </>
  )
}

function VisitPage() {
  return (
    <>
      <PageTitle eyebrow="VISIT" title="ご来店案内" intro="NAKAYAMA da arteは、長野県御代田町、浅間山のふもとにあります。旅の一つの目的として、お越しください。" />

      <section className="visit-image"><img src={asamaRoad} alt="御代田から望む浅間山" /></section>

      <section className="visit-details section-pad">
        <div>
          <p className="eyebrow">NAKAYAMA DA ARTE / MIYOTA</p>
          <h2>浅間山のふもとへ。</h2>
          <p>旅の一つの目的として訪れていただける、小さなレストランを目指しています。</p>
        </div>
        <dl className="detail-list">
          <div><dt>所在地</dt><dd>長野県御代田町<br /><span>詳しい道順はご予約確定時にご案内します</span></dd></div>
          <div><dt>席数</dt><dd>最大10席</dd></div>
          <div><dt>営業</dt><dd>夜、一日一回</dd></div>
          <div><dt>予約</dt><dd>完全予約制</dd></div>
          <div><dt>交通</dt><dd>ご予約確定時にご案内します</dd></div>
        </dl>
      </section>

      <section className="current-store section-pad border-top">
        <p className="eyebrow">BEFORE ARRIVAL</p>
        <h2>ご到着について</h2>
        <p>一日一回のコースを皆様同時に始めます。開始時刻に余裕をもってお越しください。</p>
        <TextLink href="#/experience">NAKAYAMAでの体験</TextLink>
      </section>

      <ReservationCta />
    </>
  )
}

function ReservePage() {
  return (
    <>
      <section className="reserve-page">
        <div className="reserve-page-copy">
          <p className="eyebrow">RESERVATIONS</p>
          <h1>ご予約</h1>
          <p className="large-copy">ご予約は、完全予約制で承っています。</p>
          <p>空席状況、料金、開始時刻はオンライン予約ページでご確認ください。アレルギーや苦手な食材は、ご予約時にお知らせください。</p>
          <div className="reserve-facts">
            <p><span>LOCATION</span>長野県御代田町</p>
            <p><span>STYLE</span>完全予約制・夜一回</p>
            <p><span>SEATS</span>最大10席</p>
          </div>
        </div>
        <div className="reserve-page-image"><img src={handPasta} alt="手仕事で仕立てたタリオリーニ" /></div>
      </section>
    </>
  )
}

function PageHero({ eyebrow, title, image, alt, portrait = false }: { eyebrow: string; title: string; image: string; alt: string; portrait?: boolean }) {
  return (
    <section className={`page-hero ${portrait ? 'is-portrait' : ''}`}>
      <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div>
      <img src={image} alt={alt} />
    </section>
  )
}

function PageTitle({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="page-title section-pad">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lead">{intro}</p>
    </section>
  )
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className="text-link" href={href}>{children}<Arrow /></a>
}

const dishes = [
  {
    image: tortellini,
    alt: 'トルテッリーニ',
    caption: '赤海老とリコッタチーズのトルテッリーニ',
  },
  {
    image: agnolotti,
    alt: 'アニョロッティ',
    caption: 'アニョロッティ・ダル・プリン',
  },
  {
    image: pannacotta,
    alt: '苺のゼリーで包んだパンナコッタ',
    caption: '苺のゼリーで覆ったパンナコッタ',
  },
]

function DishGallery() {
  const [selected, setSelected] = useState<number | null>(null)
  const touchStart = useRef<number | null>(null)

  useEffect(() => {
    if (selected === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'ArrowRight') setSelected((selected + 1) % dishes.length)
      if (event.key === 'ArrowLeft') setSelected((selected - 1 + dishes.length) % dishes.length)
    }
    document.body.classList.add('lightbox-is-open')
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('lightbox-is-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selected])

  const move = (direction: number) => {
    setSelected((current) => current === null ? null : (current + direction + dishes.length) % dishes.length)
  }

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStart.current === null) return
    const distance = event.changedTouches[0].clientX - touchStart.current
    if (Math.abs(distance) > 48) move(distance < 0 ? 1 : -1)
    touchStart.current = null
  }

  return (
    <>
      <div className="dish-grid">
        {dishes.map((dish, index) => (
          <figure className="dish" key={dish.caption}>
            <button className="dish-open" type="button" onClick={() => setSelected(index)} aria-label={`${dish.alt}を拡大して見る`}>
              <img src={dish.image} alt={dish.alt} />
              <span aria-hidden="true">VIEW</span>
            </button>
            <figcaption><span>0{index + 1}</span>{dish.caption}</figcaption>
          </figure>
        ))}
      </div>

      {selected !== null && createPortal(
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="料理写真">
          <button className="lightbox-close" type="button" onClick={() => setSelected(null)} aria-label="写真を閉じる" autoFocus>閉じる ×</button>
          <div
            className="lightbox-stage"
            onClick={(event) => { if (event.target === event.currentTarget) setSelected(null) }}
            onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }}
            onTouchEnd={onTouchEnd}
          >
            <img src={dishes[selected].image} alt={dishes[selected].alt} />
          </div>
          <div className="lightbox-caption">
            <p><span>0{selected + 1} / 0{dishes.length}</span>{dishes[selected].caption}</p>
            <div>
              <button type="button" onClick={() => move(-1)} aria-label="前の写真">←</button>
              <button type="button" onClick={() => move(1)} aria-label="次の写真">→</button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const height = document.documentElement.scrollHeight - window.innerHeight
        setProgress(height > 0 ? window.scrollY / height : 0)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
}

type Particle = {
  x: number
  y: number
  radius: number
  speed: number
  drift: number
  alpha: number
  phase: number
  rotation: number
  leaf: boolean
}

function NatureParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    let animationFrame = 0
    let particles: Particle[] = []
    let width = window.innerWidth
    let height = window.innerHeight
    let lastScroll = window.scrollY
    let scrollImpulse = 0
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)

    const makeParticle = (randomY = true): Particle => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + 20,
      radius: 0.7 + Math.random() * 2.1,
      speed: 0.08 + Math.random() * 0.22,
      drift: 0.15 + Math.random() * 0.45,
      alpha: 0.12 + Math.random() * 0.28,
      phase: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI,
      leaf: Math.random() > 0.78,
    })

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * pixelRatio
      canvas.height = height * pixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      const count = width < 700 ? 26 : 42
      particles = Array.from({ length: count }, () => makeParticle())
    }

    const onScroll = () => {
      const delta = window.scrollY - lastScroll
      lastScroll = window.scrollY
      scrollImpulse += Math.max(-40, Math.min(40, delta)) * -0.045
    }

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height)
      scrollImpulse *= 0.92
      particles.forEach((particle, index) => {
        particle.phase += 0.006 + particle.drift * 0.003
        particle.y -= particle.speed - scrollImpulse * 0.13
        particle.x += Math.sin(particle.phase + time * 0.00008) * particle.drift
        particle.rotation += 0.002

        if (particle.y < -24 || particle.y > height + 28 || particle.x < -24 || particle.x > width + 24) {
          particles[index] = makeParticle(false)
          return
        }

        context.save()
        context.translate(particle.x, particle.y)
        context.rotate(particle.rotation)
        context.fillStyle = particle.leaf
          ? `rgba(97, 111, 78, ${particle.alpha})`
          : `rgba(185, 165, 119, ${particle.alpha})`
        context.beginPath()
        if (particle.leaf) {
          context.ellipse(0, 0, particle.radius * 2.8, particle.radius * 0.72, 0, 0, Math.PI * 2)
        } else {
          context.arc(0, 0, particle.radius, 0, Math.PI * 2)
        }
        context.fill()
        context.restore()
      })
      animationFrame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    animationFrame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return <canvas className="nature-particles" ref={canvasRef} aria-hidden="true" />
}

const storyFrames = [
  {
    image: handsWork,
    alt: '生地を手仕事で仕立てる様子',
    label: 'TOUCH',
    title: '触れて、状態を知る。',
    body: '同じ食材でも、一つひとつ違う。手から伝わる水分や弾力を確かめます。',
  },
  {
    image: risotto,
    alt: '鍋で仕上げたイカスミのリゾット',
    label: 'TEMPERATURE',
    title: '温度の変化を、追い続ける。',
    body: '火にかけた瞬間から、状態は変わり続ける。ちょうどよく結びつく温度を探します。',
  },
  {
    image: tortellini,
    alt: '仕上げられた赤海老とリコッタチーズのトルテッリーニ',
    label: 'MOMENT',
    title: '今日の、いちばんよい瞬間へ。',
    body: '決められた形をなぞるのではなく、その日にしか選べない仕上がりへ進みます。',
  },
]

function ScrollStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const section = sectionRef.current
        if (!section) return
        const rect = section.getBoundingClientRect()
        const distance = section.offsetHeight - window.innerHeight
        const next = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0
        setProgress(next)
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const position = progress * (storyFrames.length - 1)
  const activeFrame = Math.round(position)

  return (
    <section className="scroll-story" ref={sectionRef} aria-label="NAKAYAMAの挑戦をたどる">
      <div className="scroll-story-sticky">
        <div className="story-images" aria-hidden="true">
          {storyFrames.map((story, index) => (
            <img
              key={story.label}
              src={story.image}
              alt=""
              style={{
                opacity: Math.max(0, 1 - Math.abs(position - index)),
                transform: `scale(${1.06 - Math.max(0, 1 - Math.abs(position - index)) * 0.06})`,
              }}
            />
          ))}
        </div>
        <div className="story-shade" />
        <div className="story-copy">
          <p className="eyebrow">HOW NAKAYAMA COOKS</p>
          <div className="story-words" aria-live="polite">
            {storyFrames.map((story, index) => {
              const visibility = Math.max(0, 1 - Math.abs(position - index))
              return (
                <article
                  key={story.label}
                  className={activeFrame === index ? 'is-active' : ''}
                  style={{ opacity: visibility, transform: `translateY(${(index - position) * 18}px)` }}
                >
                  <span>0{index + 1} / {story.label}</span>
                  <h2>{story.title}</h2>
                  <p>{story.body}</p>
                </article>
              )
            })}
          </div>
          <div className="story-meter" aria-hidden="true">
            {storyFrames.map((story, index) => <span key={story.label} className={activeFrame >= index ? 'is-active' : ''} />)}
          </div>
        </div>
        <p className="story-scroll-cue" aria-hidden="true">SCROLL <span>↓</span></p>
        <img className="story-accessible-image" src={storyFrames[activeFrame].image} alt={storyFrames[activeFrame].alt} />
      </div>
    </section>
  )
}

function useContinuousScrollMotion(page: PageId) {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || page === 'visit' || page === 'reserve') return
    let frame = 0
    let sections: HTMLElement[] = []
    let media: HTMLElement[] = []
    const collect = () => {
      sections = Array.from(document.querySelectorAll<HTMLElement>('#main-content > section:not(.home-opening):not(.scroll-story):not(.experience-journey), #main-content > article, #main-content .detail-list > div, #main-content .career-timeline > li, #main-content .process-rail > article, #main-content .dish, .site-footer'))
      media = Array.from(document.querySelectorAll<HTMLElement>('.feature-split > img, .miyota-feature > img, .page-hero > img, .course-visual > img, .nature-course > img, .project-story-image > img, .editorial-image > img, .dish-open > img, .chef-years > img'))
      sections.forEach((section) => section.classList.add('scroll-motion-section'))
      media.forEach((item) => item.classList.add('scroll-motion-media'))
    }
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const viewportHeight = window.innerHeight
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect()
          const entrance = Math.min(1, Math.max(0, (viewportHeight - rect.top) / (viewportHeight * 0.55)))
          section.style.setProperty('--entrance-opacity', String(0.08 + entrance * 0.92))
          section.style.setProperty('--entrance-y', `${(1 - entrance) * 42}px`)
        })
        media.forEach((item) => {
          const rect = item.getBoundingClientRect()
          const center = rect.top + rect.height / 2
          const offset = Math.min(1, Math.max(-1, (center - viewportHeight / 2) / viewportHeight))
          item.style.setProperty('--media-shift', `${offset * -24}px`)
        })
      })
    }
    const collectFrame = requestAnimationFrame(() => {
      collect()
      update()
    })
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(collectFrame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [page])
}

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>
}

function ReservationCta() {
  return (
    <section className="reservation-cta">
      <p className="eyebrow">RESERVATIONS</p>
      <h2>御代田で、お待ちしています。</h2>
      <p>完全予約制、夜一回。空席状況と詳しい内容は、ご予約ページでご確認ください。</p>
      <a className="outline-button" href="#/reserve">ご予約について<Arrow /></a>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand"><img src={brand} alt="NAKAYAMA da arte" /><p>BY RESERVATION ONLY</p></div>
      <nav aria-label="フッターナビゲーション">
        {navigation.map((item) => <a key={item.id} href={item.href}>{item.label}</a>)}
        <a href="#/reserve">ご予約</a>
      </nav>
      <div className="footer-bottom"><span>© NAKAYAMA da arte</span><a href="https://www7b.biglobe.ne.jp/~arte/" target="_blank" rel="noreferrer">CURRENT SITE ↗</a></div>
    </footer>
  )
}

export default App
