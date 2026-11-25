import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const assetUrl = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`

const drinkImages = {
  matcha: assetUrl('page-03-02.png'),
  tea: assetUrl('page-03-03.png'),
  coffee: assetUrl('page-03-04.png'),
  logo: assetUrl('page-01-01.png'),
  cafeWindow: assetUrl('page-02-01.jpeg'),
  interior1: assetUrl('page-04-01.jpeg'),
  interior2: assetUrl('page-06-01.jpeg'),
  interior3: assetUrl('page-06-02.png'),
  interior4: assetUrl('page-06-03.jpeg'),
  interior5: assetUrl('page-06-04.png'),
  interior6: assetUrl('page-06-05.jpeg'),
  interior7: assetUrl('page-06-06.png'),
  interior8: assetUrl('page-06-07.png'),
  origin: assetUrl('page-05-06.jpeg'),
  handMatcha: assetUrl('page-05-05.jpeg'),
  teaLeaves: assetUrl('page-06-03.jpeg'),
  workshop1: assetUrl('page-07-05.jpeg'),
  workshop2: assetUrl('page-07-02.png'),
  workshop3: assetUrl('page-07-04.png'),
  collab: assetUrl('page-07-02.png'),
}

function Navigation() {
  const [open, setOpen] = useState(false)
  const [atHero, setAtHero] = useState(true)

  useEffect(() => {
    const update = () => setAtHero(window.scrollY < window.innerHeight * 0.72)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <>
      <nav className="nav" aria-label="Primary navigation">
        <a className={`nav-logo ${atHero ? 'nav-logo-hidden' : ''}`} href="#top" aria-label="drink maicha, back to top">
          <img src={drinkImages.logo} alt="" />
        </a>
        <button className={`menu-button ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
          <span /><span />
        </button>
      </nav>
      <div className={`menu-panel ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="menu-links">
          {[['About', '#about'], ['What we pour', '#pour'], ['The space', '#space'], ['Collaborations', '#collaborate'], ['Find us', '#find']].map(([label, href], i) =>
            <a href={href} key={href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}</a>
          )}
        </div>
      </div>
    </>
  )
}

function BrushMark({ className = '' }) {
  return <span className={`brush-mark ${className}`} aria-hidden="true" />
}

function App() {
  const root = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from('.hero-logo', { y: 30, scale: 0.92, opacity: 0, duration: 1.1, ease: 'back.out(1.2)' })
      gsap.from('.hero-title .word', { y: 80, opacity: 0, stagger: 0.1, duration: 1, delay: 0.25, ease: 'power3.out' })
      gsap.from('.hero-cup', { y: 130, rotate: 8, opacity: 0, duration: 1.4, delay: 0.35, ease: 'power3.out' })

      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 1,
          scrollTrigger: { trigger: el, start: 'top 82%', once: true }
        })
      })

      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        gsap.to(el, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 }
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={root}>
      <Navigation />

      <section className="hero" id="top">
        <BrushMark className="hero-brush-one" />
        <BrushMark className="hero-brush-two" />
        <div className="hero-logo"><img src={drinkImages.logo} alt="drink maicha" /></div>
        <h1 className="hero-title">
          <span className="word">NEW</span><span className="word">AGE</span><span className="word">TEA</span>
          <span className="word amp">&amp;</span><span className="word">SPECIALTY</span><span className="word">BEVERAGES</span>
        </h1>
        <p className="hero-note">made for the curious,<br />the spontaneous &amp; anyone<br />craving something different.</p>
        <img className="hero-cup" src={drinkImages.matcha} alt="Iced matcha beverage" data-parallax />
        <a className="scroll-cue" href="#about"><span>scroll</span><i /></a>
      </section>

      <section className="pour" id="pour">
        <div className="pour-heading reveal">
          <span>01</span>
          <h2>WHAT WE <em>POUR</em></h2>
        </div>
        <article className="pour-item matcha reveal">
          <img src={drinkImages.matcha} alt="Iced matcha drink" data-parallax />
          <div>
            <p className="pour-number">01 /</p>
            <h3>MATCHA</h3>
            <p>From our classic latte to Signature Matcha with jasmine milk tea and lychee. All our flavours are made in-house with only 100% real ingredients and 0 artificial additives.</p>
          </div>
        </article>
        <article className="pour-item tea reveal">
          <div>
            <p className="pour-number">02 /</p>
            <h3>SPECIALTY<br />TEA</h3>
            <p>Brewed oolong, Earl Grey black tea with a vanilla honey cloud foam maybe? Or a jasmine limeaid on a hot day — warning: can be dangerously refreshing!</p>
          </div>
          <img src={drinkImages.tea} alt="Specialty tea drink" data-parallax />
        </article>
        <article className="pour-item coffee reveal">
          <img src={drinkImages.coffee} alt="Iced coffee drink" data-parallax />
          <div>
            <p className="pour-number">03 /</p>
            <h3>COFFEE</h3>
            <p>Espresso drinks, cold brew with a salted praline cloud foam, and seasonal flavours like banana cake. All our flavours are made in-house and is sure to keep you coming back.</p>
          </div>
        </article>
      </section>

      <section className="principles">
        <h2 className="principles-title reveal">WHAT MAKES US, <em>US</em></h2>
        <div className="principle principle-one">
          <img src={drinkImages.handMatcha} alt="Fresh matcha" data-parallax />
          <div className="principle-copy reveal">
            <p className="first">FIRST:</p>
            <h3>FLAVOURS &amp; INGREDIENTS YOU'LL ONLY FIND HERE</h3>
            <p>Lychee and jasmine meet freshly whisked matcha. Earl Grey gets a chai twist. We play with familiar flavours to make drinks you'll only find at drink maicha.</p>
          </div>
        </div>
        <div className="principle principle-two">
          <div className="principle-copy reveal">
            <p className="first">SECOND:</p>
            <h3>CUSTOM YET MADE FOR EVERYBODY</h3>
            <p>Pick between what kind of sweetener you'd like and sweetness level — zero, low, medium or high. Explore our vegan oat milk and dairy-free cloud foam options.</p>
          </div>
          <div className="sugar-note reveal">your cup, your call<br />sweetness / milk / foam</div>
        </div>
        <div className="principle principle-three">
          <div className="open-sign reveal">Come in<br /><strong>OPEN</strong></div>
          <div className="principle-copy reveal">
            <p className="first">THIRD:</p>
            <h3>CUSTOMER FIRST</h3>
            <p>How we look after you matters as much as what we pour. If you're new to matcha or torn between two drinks, we'll ask what you like and help you find your cup. Whether you're popping in or staying a while, we want you to feel at home here.</p>
          </div>
        </div>
      </section>

      <section className="origin">
        <BrushMark className="origin-brush" />
        <h2 className="origin-title reveal">OUR TEA, BY ORIGIN</h2>
        <div className="origin-layout">
          <div className="origin-copy reveal">
            <p><strong>Matcha</strong><br />Our matcha is sourced from Uji, Kyoto and we blend Yabukita for depth, Saemidori for sweetness and Okumidori for vivid colour and umami. The result is smooth, full-bodied, with a lingering sweetness.</p>
            <p><strong>Tea</strong><br />We source our tea from India and neighbouring China. Our whole-leaf Assam Earl Grey is made with 100% natural bergamot oil, jasmine green tea from Zhejiang, Anhui and Yunnan provinces in China and Oolong tea from a historic Darjeeling estate in the Himalayan foothills.</p>
          </div>
          <figure className="origin-photo origin-photo-main reveal" data-parallax>
            <img src={drinkImages.origin} alt="Tea plantation" />
            <figcaption>Where it all starts, the tea slopes</figcaption>
          </figure>
          <figure className="origin-photo origin-photo-hand reveal" data-parallax>
            <img src={drinkImages.handMatcha} alt="Fresh tea leaves in hand" />
            <figcaption>handpicked &amp; stone-milled at source</figcaption>
          </figure>
        </div>
        <p className="origin-close reveal">THOUGHTFULLY SOURCED. PROPERLY WHISKED. JUST HOW WE LIKE IT.</p>
      </section>

      <section className="space" id="space">
        <div className="space-collage">
          <figure className="space-a reveal"><img src={drinkImages.interior1} alt="The café seating area" /></figure>
          <figure className="space-b reveal"><img src={drinkImages.interior2} alt="The café counter" /></figure>
          <figure className="space-c reveal"><img src={drinkImages.interior4} alt="A quiet café corner" /></figure>
          <figure className="space-d reveal"><img src={drinkImages.interior8} alt="The café interior" /></figure>
        </div>
        <div className="space-copy reveal">
          <h2>THE SPACE</h2>
          <p>Room for solo dates, long conversations, spontaneous catch-ups and unfinished to-do lists, for focused work and creative breakthroughs over a second cup.</p>
        </div>
      </section>

      <section className="collaborate" id="collaborate">
        <div className="collab-heading reveal">
          <h2>DO<br /><em>MORE</em></h2>
          <p>FOR YOUR BRAND WITH US</p>
        </div>
        <div className="collab-list">
          <article className="collab-item reveal">
            <h3>A DRINK MADE TOGETHER</h3>
            <p>Develop a limited-run drink for your brand, from the flavour to visible branding to how we serve it.</p>
          </article>
          <article className="collab-item reveal">
            <h3>A GATHERING AT OUR SPACE</h3>
            <p>Host a tasting, workshop or small community event at our Castle Street café. Our space can accommodate up to 12 people and more.</p>
          </article>
          <article className="collab-item reveal">
            <h3>A LIVE MATCHA BAR</h3>
            <p>Bring our whisking ritual to a launch, pop-up or team gathering. Guests can watch their drink being made or participate in making their own unique drink with a variety of custom drink maicha flavours.</p>
          </article>
        </div>
        <div className="collab-photos">
          <figure className="collab-photo-a reveal"><img src={drinkImages.workshop1} alt="A drink maicha collaboration workshop" /></figure>
          <figure className="collab-photo-b reveal"><img src={drinkImages.workshop2} alt="Custom drink branding" /></figure>
          <figure className="collab-photo-c reveal"><img src={drinkImages.workshop3} alt="Community workshop" /></figure>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-copy">
          <p className="kicker reveal">THE PEOPLE BEHIND THE POUR</p>
          <h2 className="display reveal">ABOUT <em>US</em></h2>
          <div className="about-body reveal">
            <p>We're an independent new age specialty tea &amp; matcha hideaway located on Castle St, Ashok Nagar in Bengaluru, dedicated to good beverages and better afternoons.</p>
            <p>We're doing some interesting things with tea &amp; matcha. Whisking with intention, brewing teas with character, coffee made well and seriously playful flavours.</p>
            <p>Some familiar, some unexpected (in the best way), and a few you'll wish you'd tried sooner.</p>
          </div>
        </div>
        <div className="about-photo reveal" data-parallax>
          <img src={drinkImages.cafeWindow} alt="View through the drink maicha café window" />
          <span className="photo-caption">Castle St / Bengaluru</span>
        </div>
      </section>

      <footer className="footer" id="find">
        <div className="footer-top">
          <span className="footer-brand">DM / BENGALURU</span>
          <a href="mailto:emailmaicha@gmail.com">NEED A RECOMMENDATION?<br /><strong>EMAIL US</strong></a>
          <a href="https://www.instagram.com/drink.maicha/" target="_blank" rel="noreferrer">A GLIMPSE BEFORE YOU GO<br /><strong>@drink.maicha</strong></a>
        </div>
        <div className="footer-main">
          <div className="footer-invite">
            <p className="footer-kicker">CASTLE STREET / BENGALURU</p>
            <h2 className="footer-title reveal">TAKE A<br /><em>DETOUR.</em></h2>
            <p className="footer-copy reveal">The best things are rarely on the straight path. Find our little corner, order something unexpected, and let the afternoon take it from there.</p>
            <a className="footer-map-link" href="https://maps.app.goo.gl/TWHgutWCLyoWziK47?g_st=ic" target="_blank" rel="noopener noreferrer" aria-label="Get directions to drink maicha in Google Maps">
              <span>GET DIRECTIONS</span><b aria-hidden="true">↗</b>
            </a>
          </div>
          <div className="footer-visual">
            <figure className="footer-photo reveal" data-parallax>
              <img src={drinkImages.interior2} alt="Inside the drink maicha café" />
              <figcaption className="footer-photo-note">your afternoon looks good from here</figcaption>
            </figure>
            <span className="footer-sticker" aria-hidden="true">GOOD<br />CUPS<br />AHEAD</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>NO PLAN NEEDED / JUST SHOW UP</span>
          <span>CASTLE STREET, BENGALURU</span>
        </div>
      </footer>
    </main>
  )
}

export default App
