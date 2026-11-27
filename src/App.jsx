import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const assetUrl = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`
const siteUrls = {
  home: import.meta.env.BASE_URL,
  about: `${import.meta.env.BASE_URL}about-us/`,
  experiences: `${import.meta.env.BASE_URL}experiences-promotions/`,
  game: `${import.meta.env.BASE_URL}whisk-up-your-own/`,
  gallery: `${import.meta.env.BASE_URL}gallery/`,
  recommendation: `${import.meta.env.BASE_URL}find-your-matcha/`,
}

const drinkImages = {
  matcha: assetUrl('page-03-02.png'),
  tea: assetUrl('page-03-03.png'),
  coffee: assetUrl('page-03-04.png'),
  logo: assetUrl('drink-maicha-logo.svg'),
  mascot: assetUrl('mascot.png'),
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
  workshopEvent: assetUrl('page-07-03.jpeg'),
  collab: assetUrl('page-07-02.png'),
}

const matchaBlends = [
  { value: 'signature', label: 'Signature Matcha', note: 'Jasmine milk tea + lychee', color: '#81964d', accent: '#c4d083' },
  { value: 'latte', label: 'Matcha Latte', note: 'Fresh matcha + milk', color: '#91aa65', accent: '#e4dfb8' },
  { value: 'guiltea', label: 'Guiltea Pleasure', note: 'Vanilla bean + white chocolate milk', color: '#a49554', accent: '#ead69a' },
  { value: 'nine-to-five', label: '9-to-5', note: 'Earl Grey + matcha', color: '#657c43', accent: '#bdc582' },
  { value: 'date-night', label: 'Date Night', note: 'Jasmine milk tea + matcha', color: '#91a85b', accent: '#d8d89a' },
  { value: 'strawberry', label: 'Strawberry Matcha', note: 'Strawberry milk + matcha', color: '#a27d67', accent: '#e4b7a5' },
  { value: 'dnd', label: 'DND', note: 'Matcha + water over ice', color: '#527338', accent: '#98b269' },
  { value: 'coast-is-clear', label: 'Coast Is Clear', note: 'Matcha + coconut water', color: '#67917b', accent: '#bfd8bb' },
]
const recommendationQuestions = [
  {
    title: 'What kind of flavour feels like you?',
    answers: [
      { label: 'Creamy & classic', note: 'Fresh matcha and milk', scores: { latte: 2, guiltea: 1 } },
      { label: 'Floral & playful', note: 'Jasmine, with a fruity twist', scores: { signature: 2, 'date-night': 2 } },
      { label: 'Sweet little treat', note: 'A dessert-like matcha', scores: { guiltea: 2, strawberry: 1 } },
      { label: 'Bright & tea-forward', note: 'A clear, brewed tea note', scores: { 'nine-to-five': 2, dnd: 1, 'coast-is-clear': 1 } },
    ],
  },
  {
    title: 'What is your afternoon energy?',
    answers: [
      { label: 'Slow & steady', note: 'A gentle, familiar pause', scores: { latte: 1, 'date-night': 1 } },
      { label: 'Curious & playful', note: 'Something a little unexpected', scores: { signature: 1, 'nine-to-five': 1, guiltea: 1 } },
      { label: 'Fresh & focused', note: 'Clean and uncomplicated', scores: { dnd: 1, 'coast-is-clear': 1, 'nine-to-five': 1 } },
      { label: 'Sweet tooth first', note: 'A little treat-yourself moment', scores: { guiltea: 1, strawberry: 1 } },
    ],
  },
  {
    title: 'Which base would you reach for?',
    answers: [
      { label: 'Milk / latte-style', note: 'Soft, creamy and familiar', scores: { latte: 1, signature: 1, 'date-night': 1, guiltea: 1, strawberry: 1 } },
      { label: 'Jasmine milk tea', note: 'Floral and fragrant', scores: { signature: 2, 'date-night': 2 } },
      { label: 'Strawberry milk', note: 'Fruity and playful', scores: { strawberry: 3 } },
      { label: 'Water over ice', note: 'Just matcha and water', scores: { dnd: 3 } },
      { label: 'Coconut water', note: 'A crisp, refreshing base', scores: { 'coast-is-clear': 3 } },
      { label: 'Vanilla + white chocolate milk', note: 'A rich, sweet pairing', scores: { guiltea: 3 } },
    ],
  },
]

function getMatchaRecommendation(answers) {
  const scores = Object.fromEntries(matchaBlends.map(({ value }) => [value, 0]))

  answers.forEach((answer) => {
    Object.entries(answer.scores).forEach(([blend, score]) => {
      scores[blend] += score
    })
  })

  return matchaBlends.reduce((best, blend) =>
    scores[blend.value] > scores[best.value] ? blend : best
  )
}
const matchaTemperatures = [
  { value: 'hot', label: 'Hot' },
  { value: 'cold', label: 'Cold' },
]
const matchaSizes = [
  { value: 'small', label: 'Small' },
  { value: 'regular', label: 'Regular' },
]
const matchaSweetness = [
  { value: '0%', label: 'Zero', texture: 'none' },
  { value: '25%', label: 'Low · 25%', texture: 'light' },
  { value: '50%', label: 'Medium · 50%', texture: 'medium' },
  { value: '75%', label: 'High · 75%', texture: 'rich' },
]
const matchaAddOns = [
  { value: 'salted-praline', label: 'Salted praline cloud foam', kind: 'foam', color: '#b78c61' },
  { value: 'cheese-foam', label: 'Cheese foam', kind: 'foam', color: '#ead8a6' },
  { value: 'vanilla-honey', label: 'Vanilla honey foam', kind: 'foam', color: '#e6c77e' },
  { value: 'oat-milk', label: 'Oat milk', kind: 'milk', color: '#d9c99e' },
  { value: 'extra-matcha', label: 'Extra matcha shot', kind: 'shot', color: '#4d7136' },
  { value: 'agave', label: 'Agave sweetener', kind: 'sweetener', color: '#d3a643' },
]

function Navigation({ page }) {
  const [open, setOpen] = useState(false)
  const [atHero, setAtHero] = useState(true)

  useEffect(() => {
    const update = () => setAtHero(page === 'home' && window.scrollY < window.innerHeight * 0.72)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [page])

  const links = [
    { page: 'home', label: 'Home', href: siteUrls.home },
    { page: 'experiences', label: 'Experiences & Promotions', href: siteUrls.experiences },
    { page: 'game', label: 'Whisk Up Your Own', href: siteUrls.game },
    { page: 'recommendation', label: 'Find Your Matcha', href: siteUrls.recommendation },
    { page: 'gallery', label: 'Gallery', href: siteUrls.gallery },
    { page: 'about', label: 'About Us', href: siteUrls.about },
  ]

  return (
    <>
      <nav className="nav" aria-label="Primary navigation">
        <a className={`nav-logo ${page === 'home' && atHero ? 'nav-logo-hidden' : ''}`} href={siteUrls.home} aria-label="drink maicha, go to home">
          <img src={drinkImages.logo} alt="" />
        </a>
        <button className={`menu-button ${open ? 'is-open' : ''}`} type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="primary-menu" aria-label="Toggle menu">
          <span /><span />
        </button>
      </nav>
      <div className={`menu-panel ${open ? 'is-open' : ''}`} id="primary-menu" aria-hidden={!open} inert={!open}>
        <div className="menu-links">
          {links.map(({ page: targetPage, label, href }, index) =>
            <a href={href} key={targetPage} aria-current={page === targetPage ? 'page' : undefined} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>{label}
            </a>
          )}
        </div>
      </div>
    </>
  )
}

function BrushMark({ className = '' }) {
  return <span className={`brush-mark ${className}`} aria-hidden="true" />
}

function MatchaMixer() {
  const [recipe, setRecipe] = useState(() => {
    const requestedBlend = new URLSearchParams(window.location.search).get('blend')
    return {
    blend: matchaBlends.some(({ value }) => value === requestedBlend) ? requestedBlend : 'signature',
    temperature: 'cold',
    size: 'regular',
    sweetness: '50%',
    addOns: [],
    }
  })
  const [strokes, setStrokes] = useState(0)
  const totalStrokes = 7
  const blend = matchaBlends.find(({ value }) => value === recipe.blend)
  const selectedAddOns = matchaAddOns.filter(({ value }) => recipe.addOns.includes(value))
  const foam = selectedAddOns.find(({ kind }) => kind === 'foam')
  const ready = strokes === totalStrokes
  const addOnDescription = selectedAddOns.map(({ label }) => label).join(', ')
  const drinkDescription = `${recipe.size} / ${recipe.temperature} / ${recipe.sweetness} sweetness${addOnDescription ? ` / ${addOnDescription}` : ''}.`
  const sweetness = matchaSweetness.find(({ value }) => value === recipe.sweetness)
  const sweetnessOpacity = { none: 0.08, light: 0.18, medium: 0.32, rich: 0.52 }[sweetness.texture]
  const cupClasses = [
    'mix-stage',
    `blend-${blend.value}`,
    `temperature-${recipe.temperature}`,
    `size-${recipe.size}`,
    recipe.addOns.includes('extra-matcha') && 'has-extra-matcha',
    recipe.addOns.includes('agave') && 'has-agave',
    recipe.addOns.includes('oat-milk') && 'has-oat-milk',
    foam && `foam-${foam.value}`,
    strokes > 0 && !ready && 'is-mixing',
    ready && 'is-ready',
  ].filter(Boolean).join(' ')

  const chooseOption = (key, value) => {
    setRecipe((current) => ({ ...current, [key]: value }))
    setStrokes(0)
  }

  const toggleAddOn = (value) => {
    const option = matchaAddOns.find((addOn) => addOn.value === value)
    setRecipe((current) => ({
      ...current,
      addOns: current.addOns.includes(value)
        ? current.addOns.filter((addOn) => addOn !== value)
        : [
            ...current.addOns.filter((addOn) =>
              option?.kind === 'foam'
                ? matchaAddOns.find((item) => item.value === addOn)?.kind !== 'foam'
                : true
            ),
            value,
          ],
    }))
    setStrokes(0)
  }

  const whisk = () => {
    setStrokes((current) => current >= totalStrokes ? 0 : current + 1)
  }

  return (
    <section className="matcha-game" id="mix" aria-labelledby="matcha-game-title">
      <div className="matcha-game-copy">
        <p className="mix-kicker">A LITTLE PLAY BEFORE YOUR POUR</p>
        <h2 className="matcha-game-title" id="matcha-game-title">WHISK UP<br /><em>your own.</em></h2>
        <p className="mix-intro">Start with one of our matcha favourites, make it yours with a few little extras, then give your cup seven good whisk strokes.</p>

        <div className="mix-controls">
          <fieldset className="mix-choice mix-choice-blend">
            <legend><span>01</span> PICK YOUR MATCHA</legend>
            <div className="mix-blend-options">
              {matchaBlends.map((option) => (
                <button
                  className={`mix-blend-option ${recipe.blend === option.value ? 'is-selected' : ''}`}
                  type="button"
                  aria-pressed={recipe.blend === option.value}
                  key={option.value}
                  onClick={() => chooseOption('blend', option.value)}
                >
                  <span>{option.label}</span>
                  <small>{option.note}</small>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mix-choice mix-choice-serve">
            <legend><span>02</span> HOT / COLD + SIZE</legend>
            <div className="mix-serve-options">
              <div className="mix-subchoice">
                <span className="mix-subchoice-label">TEMPERATURE</span>
                <div className="mix-choice-options">
                  {matchaTemperatures.map((option) => (
                    <button className={`mix-option ${recipe.temperature === option.value ? 'is-selected' : ''}`} type="button" aria-pressed={recipe.temperature === option.value} key={option.value} onClick={() => chooseOption('temperature', option.value)}>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mix-subchoice">
                <span className="mix-subchoice-label">SIZE</span>
                <div className="mix-choice-options">
                  {matchaSizes.map((option) => (
                    <button className={`mix-option ${recipe.size === option.value ? 'is-selected' : ''}`} type="button" aria-pressed={recipe.size === option.value} key={option.value} onClick={() => chooseOption('size', option.value)}>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="mix-choice mix-choice-sweetness">
            <legend><span>03</span> SWEETENER LEVEL</legend>
            <div className="mix-choice-options">
              {matchaSweetness.map((option) => (
                <button className={`mix-option ${recipe.sweetness === option.value ? 'is-selected' : ''}`} type="button" aria-pressed={recipe.sweetness === option.value} key={option.value} onClick={() => chooseOption('sweetness', option.value)}>
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mix-choice mix-choice-addons">
            <legend><span>04</span> CLOUD FOAM + ADD-ONS</legend>
            <div className="mix-choice-options">
              {matchaAddOns.map((option) => (
                <button className={`mix-option ${recipe.addOns.includes(option.value) ? 'is-selected' : ''}`} type="button" aria-pressed={recipe.addOns.includes(option.value)} key={option.value} onClick={() => toggleAddOn(option.value)}>
                  {option.label}
                </button>
              ))}
            </div>
            <p className="mix-addon-hint">Pick as many as you like, or keep it simple.</p>
          </fieldset>
        </div>
      </div>

      <div className="mix-play">
        <div className="mix-play-heading">
          <span>THE WHISKING RITUAL</span>
          <span>{String(strokes).padStart(2, '0')} / 07</span>
        </div>
        <div
          className={cupClasses}
          style={{
            '--matcha-color': blend.color,
            '--blend-accent': blend.accent,
            '--milk-color': recipe.addOns.includes('oat-milk') ? '#d9c99e' : '#f0e2c5',
            '--sweetener-color': recipe.sweetness === '0%' ? blend.accent : recipe.sweetness === '75%' ? '#d4bb68' : '#b9b66f',
            '--sweetness-opacity': sweetnessOpacity,
            '--foam-color': foam?.color || 'transparent',
            '--liquid-level': `${24 + (strokes / totalStrokes) * 58}%`,
          }}
        >
          <div
            className="mix-cup"
            role="img"
            aria-label={`${blend.label}, ${recipe.temperature}, ${recipe.size}, ${sweetness.label} sweetness${addOnDescription ? `, ${addOnDescription}` : ''}`}
          >
            <span className="mix-liquid">
              <span className="mix-liquid-pattern" />
              {foam && <span className="mix-foam" />}
              {recipe.temperature === 'cold' && <span className="mix-ice mix-ice-one" />}
              {recipe.temperature === 'cold' && <span className="mix-ice mix-ice-two" />}
              {recipe.temperature === 'cold' && <span className="mix-ice mix-ice-three" />}
            </span>
            <span className="mix-cup-shine" />
          </div>
          {recipe.temperature === 'hot' && <span className="mix-steam" aria-hidden="true"><i /><i /><i /></span>}
          <svg className="mix-whisk" viewBox="0 0 56 210" aria-hidden="true">
            <path d="M28 7v119" />
            <path d="M28 124c-18 2-23 13-19 28 4 14 14 28 19 31 5-3 15-17 19-31 4-15-1-26-19-28Z" />
            <path d="M28 125c-10 13-11 38 0 58m0-58c10 13 11 38 0 58m-15-49c-2 16 4 37 15 49m15-49c2 16-4 37-15 49" />
          </svg>
          <span className="mix-stage-note" aria-hidden="true">FRESHLY<br />WHISKED</span>
        </div>
        <div
          className="mix-progress"
          role="progressbar"
          aria-label="Whisking progress"
          aria-valuemin={0}
          aria-valuemax={totalStrokes}
          aria-valuenow={strokes}
        >
          <span style={{ width: `${(strokes / totalStrokes) * 100}%` }} />
        </div>
        <button
          className="mix-whisk-button"
          type="button"
          onClick={whisk}
          aria-label={ready ? 'Make another matcha' : `Whisk the matcha, stroke ${strokes + 1} of ${totalStrokes}`}
        >
          <span>{ready ? 'MAKE ANOTHER' : 'WHISK IT'}</span>
          <b aria-hidden="true">{ready ? '↻' : `${strokes}/07`}</b>
        </button>
        <p className="mix-status" aria-live="polite">
          {ready ? <><strong>{blend.label}.</strong> {drinkDescription}</> : strokes === 0 ? 'Tap the whisk seven times to bring your blend together.' : `${totalStrokes - strokes} more ${totalStrokes - strokes === 1 ? 'stroke' : 'strokes'} to your perfect cup.`}
        </p>
      </div>
    </section>
  )
}

function MatchaRecommendationPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const question = recommendationQuestions[step]

  const chooseAnswer = (answer) => {
    setAnswers((current) => {
      const next = [...current]
      next[step] = answer
      return next
    })
    setResult(null)
  }

  const continueQuiz = () => {
    if (!answers[step]) return
    if (step < recommendationQuestions.length - 1) {
      setStep((current) => current + 1)
      return
    }
    setResult(getMatchaRecommendation(answers))
  }

  const startAgain = () => {
    setStep(0)
    setAnswers([])
    setResult(null)
  }

  return (
    <>
      <header className="recommendation-intro">
        <p className="kicker">THREE QUESTIONS / ONE VERY GOOD CUP</p>
        <h1>FIND YOUR<br /><em>MATCHA.</em></h1>
        <p>A little about your mood, a little about your flavour moodboard — then a matcha from our menu that feels like you.</p>
      </header>
      <section className="matcha-quiz" aria-label="Matcha recommendation quiz">
        <div className="quiz-card">
          {!result ? (
            <>
              <div className="quiz-progress">
                <span>QUESTION {String(step + 1).padStart(2, '0')} / 03</span>
                <div role="progressbar" aria-label="Quiz progress" aria-valuemin={0} aria-valuemax={3} aria-valuenow={step + 1}>
                  <span style={{ width: `${((step + 1) / recommendationQuestions.length) * 100}%` }} />
                </div>
              </div>
              <p className="quiz-kicker">A QUICK LITTLE CHECK-IN</p>
              <h2>{question.title}</h2>
              <div className="quiz-options" role="group" aria-label={question.title}>
                {question.answers.map((answer, index) => (
                  <button
                    className={`quiz-option ${answers[step] === answer ? 'is-selected' : ''}`}
                    type="button"
                    aria-pressed={answers[step] === answer}
                    key={answer.label}
                    onClick={() => chooseAnswer(answer)}
                  >
                    <span className="quiz-option-number">0{index + 1}</span>
                    <span>
                      <strong>{answer.label}</strong>
                      <small>{answer.note}</small>
                    </span>
                    <span className="quiz-option-mark" aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
              <div className="quiz-actions">
                <button className="quiz-back" type="button" onClick={() => setStep((current) => current - 1)} disabled={step === 0}>BACK</button>
                <button className="quiz-next" type="button" onClick={continueQuiz} disabled={!answers[step]}>
                  {step === recommendationQuestions.length - 1 ? 'REVEAL MY MATCH' : 'NEXT QUESTION'} <span aria-hidden="true">→</span>
                </button>
              </div>
            </>
          ) : (
            <div className="quiz-result" aria-live="polite">
              <p className="quiz-kicker">YOUR MATCHA MATCH IS</p>
              <h2>{result.label}</h2>
              <p className="quiz-result-note">{result.note}</p>
              <p>Picked from the drinks and flavour notes already on our menu — made to match the answers you chose.</p>
              <div className="quiz-result-actions">
                <a className="quiz-next" href={`${siteUrls.game}?blend=${encodeURIComponent(result.value)}`}>WHISK THIS BLEND <span aria-hidden="true">↗</span></a>
                <button className="quiz-back" type="button" onClick={startAgain}>TRY AGAIN</button>
              </div>
            </div>
          )}
        </div>
        <p className="quiz-footnote">Every cup is a little different. If you’re still deciding, our team can help you find your pour.</p>
      </section>
    </>
  )
}

function GalleryPage() {
  const moments = [
    { src: drinkImages.interior1, alt: 'The entrance to the drink maicha café', caption: 'A little place on Castle Street' },
    { src: drinkImages.interior2, alt: 'The café counter and seating area', caption: 'Room for one more cup' },
    { src: drinkImages.interior3, alt: 'A warm, sunlit café seating nook', caption: 'Find your corner' },
    { src: drinkImages.interior4, alt: 'Guests spending time together in the café', caption: 'Good company, no rush' },
    { src: drinkImages.interior6, alt: 'A guest working at a café table with matcha', caption: 'A pause between plans' },
    { src: drinkImages.workshop2, alt: 'Fresh matcha being prepared at a workshop', caption: 'The whisking ritual' },
    { src: drinkImages.workshopEvent, alt: 'Guests sharing a creative café workshop', caption: 'Made together' },
    { src: drinkImages.workshop3, alt: 'Guests taking part in a hands-on matcha workshop', caption: 'A table full of ideas' },
    { src: drinkImages.workshop1, alt: 'A matcha experience shared outdoors', caption: 'A little maicha, wherever the day goes' },
  ]

  return (
    <>
      <header className="gallery-intro">
        <p className="kicker">THE SPACE / THE WHISK / THE PEOPLE</p>
        <h1>A LITTLE LOOK<br /><em>AROUND.</em></h1>
        <p>Step into our Castle Street hideaway and catch a few moments from the gatherings, cups and creative afternoons that happen here.</p>
      </header>
      <section className="gallery-grid" aria-label="Drink Maicha café and experiences gallery">
        {moments.map((moment, index) => (
          <figure className={`gallery-item gallery-item-${index + 1} reveal`} key={moment.src}>
            <img src={moment.src} alt={moment.alt} loading="lazy" decoding="async" />
            <figcaption><span>0{index + 1} /</span>{moment.caption}</figcaption>
          </figure>
        ))}
      </section>
    </>
  )
}

function HeroSection() {
  return (
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
      <a className="scroll-cue" href="#pour"><span>scroll</span><i /></a>
    </section>
  )
}

function PourSection() {
  return (
    <section className="pour" id="pour">
      <div className="pour-heading reveal">
        <h2>WHAT WE <em>POUR</em></h2>
      </div>
      <article className="pour-item matcha reveal">
        <div className="pour-item-visual">
          <img src={drinkImages.matcha} alt="Iced matcha drink" />
        </div>
        <div>
          <p className="pour-number">01 /</p>
          <h3>MATCHA</h3>
          <p>From our classic latte to Signature Matcha with jasmine milk tea and lychee. All our flavours are made in-house with only 100% real ingredients and 0 artificial additives.</p>
        </div>
      </article>
      <article className="pour-item tea reveal">
        <div className="pour-item-visual">
          <img src={drinkImages.tea} alt="Specialty tea drink" />
        </div>
        <div>
          <p className="pour-number">02 /</p>
          <h3>SPECIALTY<br />TEA</h3>
          <p>Brewed oolong, Earl Grey black tea with a vanilla honey cloud foam maybe? Or a jasmine limeaid on a hot day — warning: can be dangerously refreshing!</p>
        </div>
      </article>
      <article className="pour-item coffee reveal">
        <div className="pour-item-visual">
          <img src={drinkImages.coffee} alt="Iced coffee drink" />
        </div>
        <div>
          <p className="pour-number">03 /</p>
          <h3>COFFEE</h3>
          <p>Espresso drinks, cold brew with a salted praline cloud foam, and seasonal flavours like banana cake. All our flavours are made in-house and is sure to keep you coming back.</p>
        </div>
      </article>
    </section>
  )
}

function OrderOnline() {
  return (
    <section className="order-online" aria-labelledby="order-online-title">
      <div className="order-online-copy">
        <p className="kicker">YOUR CUP, YOUR CALL</p>
        <h2 id="order-online-title">ORDER<br /><em>ONLINE</em></h2>
        <p>Find drink maicha on your favourite delivery app.</p>
      </div>
      <div className="order-platforms">
        {['Swiggy', 'Zomato'].map((platform) => (
          <div className="order-platform" key={platform}>
            <span className="order-platform-number">{platform === 'Swiggy' ? '01' : '02'} / DELIVERY</span>
            <h3>{platform}</h3>
            <p>Coming soon.</p>
            <a
  className="delivery-button"
  href={platform === 'Swiggy' ? 'https://www.swiggy.com/' : 'https://www.zomato.com/'}
  target="_blank"
  rel="noopener noreferrer"
>
  Order on {platform} ↗
</a>
          </div>
        ))}
      </div>
    </section>
  )
}

function CustomerReviews() {
  return (
    <section className="customer-reviews" aria-labelledby="customer-reviews-title">
      <p className="kicker">A LITTLE LOVE FROM OUR COMMUNITY</p>
      <h2 id="customer-reviews-title">GOOD CUPS.<br /><em>KIND WORDS.</em></h2>
      <div className="review-placeholder">
        <span aria-hidden="true">“</span>
        <p>Approved customer reviews will appear here.</p>
        <small>REVIEW COPY NEEDED</small>
      </div>
      <p className="review-note">We’re saving a seat for your words.</p>
    </section>
  )
}

function AboutStorySection() {
  return (
    <header className="about-story-intro" aria-labelledby="about-title">
      <div className="about-story-intro-copy">
        <p className="kicker">THE PEOPLE BEHIND THE POUR</p>
        <h1 id="about-title">A SLOW SIP<br /><em>IN A FAST WORLD.</em></h1>
        <p>Founded by Maya Srinath and rooted in Bengaluru, drink maicha is an independent new-age tea and matcha hideaway on Castle Street. We make thoughtful drinks for everyday rituals — with a little room for the unexpected.</p>
        <a className="story-scroll-link" href="#about-beat-pause">SCROLL TO MEET US <span aria-hidden="true">↓</span></a>
      </div>
      <figure className="about-mascot-card">
        <img src={drinkImages.mascot} alt="The Drink Maicha mascot, with arms outstretched" />
        <figcaption>YOUR LITTLE GUIDE TO THE GOOD STUFF</figcaption>
      </figure>
    </header>
  )
}

const aboutStoryBeats = [
  {
    id: 'about-beat-pause',
    number: '01',
    title: 'A PAUSE BETWEEN THE CHAOS.',
    body: 'Matcha is more than a drink; it can be a slow sip in a fast world. We skip the complicated ceremony and keep the good part: whisk, sip, and let the day find its rhythm again.',
    image: drinkImages.cafeWindow,
    alt: 'The Drink Maicha café window on Castle Street',
    note: 'First, take a breath.',
  },
  {
    id: 'about-beat-origin',
    number: '02',
    title: 'THOUGHTFULLY SOURCED. PROPERLY WHISKED.',
    body: 'Our matcha comes from Uji, Kyoto. We blend Yabukita for depth, Saemidori for sweetness and Okumidori for vivid colour and umami — a smooth, full-bodied cup with a lingering sweetness.',
    image: drinkImages.origin,
    alt: 'Rows of tea plants on a green hillside',
    note: 'Good things have a beginning.',
  },
  {
    id: 'about-beat-flavour',
    number: '03',
    title: 'FAMILIAR, WITH A LITTLE TWIST.',
    body: 'Jasmine milk tea and lychee meet freshly whisked matcha. Earl Grey brings its own tea character. We like a flavour that feels both new and easy to love.',
    image: drinkImages.handMatcha,
    alt: 'A hand holding fresh tea leaves',
    note: 'Curiosity looks good on you.',
  },
  {
    id: 'about-beat-your-cup',
    number: '04',
    title: 'YOUR CUP, YOUR CALL.',
    body: 'Choose your sweetness, try oat milk, or add a cloud foam. Whether you know exactly what you want or need a little help deciding, we’ll make room for your kind of afternoon.',
    image: drinkImages.interior4,
    alt: 'Guests sharing a quiet moment in the café',
    note: 'Make it yours.',
  },
]

function MascotStory() {
  const storyRef = useRef(null)
  const [activeStory, setActiveStory] = useState(aboutStoryBeats[0].id)
  const activeBeat = aboutStoryBeats.find(({ id }) => id === activeStory) || aboutStoryBeats[0]

  useEffect(() => {
    if (!storyRef.current || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver((entries) => {
      const visibleBeat = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]
      if (visibleBeat) setActiveStory(visibleBeat.target.id)
    }, { rootMargin: '-34% 0px -38% 0px', threshold: [0, 0.25, 0.5, 0.75] })

    storyRef.current.querySelectorAll('.mascot-story-beat').forEach((beat) => observer.observe(beat))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="mascot-story" id="about-story" ref={storyRef} aria-label="The Drink Maicha story">
      <div className="mascot-story-rail">
        <div className="mascot-story-guide">
          <img src={drinkImages.mascot} alt="" />
          <p aria-live="polite">{activeBeat.note}</p>
        </div>
        <nav className="mascot-story-nav" aria-label="About story chapters">
          {aboutStoryBeats.map((beat) => (
            <a href={`#${beat.id}`} key={beat.id} aria-current={activeStory === beat.id ? 'step' : undefined}>
              <span>{beat.number}</span>{beat.title}
            </a>
          ))}
        </nav>
      </div>
      <div className="mascot-story-chapters">
        {aboutStoryBeats.map((beat) => (
          <article className="mascot-story-beat reveal" id={beat.id} key={beat.id}>
            <figure>
              <img src={beat.image} alt={beat.alt} loading="lazy" decoding="async" />
              <figcaption>{beat.number} / A LITTLE MAICHA MOMENT</figcaption>
            </figure>
            <div className="mascot-story-copy">
              <p className="kicker">CHAPTER {beat.number}</p>
              <h2>{beat.title}</h2>
              <p>{beat.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function OriginSection() {
  return (
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
  )
}

function SpaceSection() {
  return (
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
  )
}

function CollaborationSection() {
  return (
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
  )
}

function ExperienceIntro() {
  return (
    <section className="experience-intro">
      <p className="kicker">COME TOGETHER OVER A GOOD CUP</p>
      <h1>MAKE A MOMENT<br /><em>OF IT.</em></h1>
      <p>From a tasting at the café to a live matcha bar for your next gathering, explore ways to share a little drink maicha.</p>
      <a className="experience-jump" href="#enquire">TELL US WHAT YOU’RE PLANNING <span aria-hidden="true">↓</span></a>
    </section>
  )
}

function WorkshopFeature() {
  return (
    <section className="experience-workshop" aria-labelledby="experience-workshop-title">
      <div className="experience-workshop-copy">
        <p className="kicker">GATHER AT OUR SPACE</p>
        <h2 id="experience-workshop-title">MAKE ROOM<br /><em>TO CREATE.</em></h2>
        <p>Host a tasting, workshop or small community event at our Castle Street café. Tell us about your gathering and we’ll explore what works for you.</p>
      </div>
      <figure className="experience-workshop-photo">
        <img src={drinkImages.workshopEvent} alt="Guests taking part in a creative workshop around a table" />
        <figcaption>WORKSHOPS / CASTLE STREET, BENGALURU</figcaption>
      </figure>
    </section>
  )
}

function EnquirySection() {
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const subject = `Drink Maicha enquiry: ${formData.get('type')}`
    const body = [
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Enquiry type: ${formData.get('type')}`,
      '',
      formData.get('message'),
    ].join('\n')
    window.location.href = `mailto:emailmaicha@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="enquiry" id="enquire" aria-labelledby="enquiry-title">
      <div className="enquiry-copy">
        <p className="kicker">LET’S MAKE SOMETHING GOOD</p>
        <h2 id="enquiry-title">HAVE AN<br /><em>IDEA?</em></h2>
        <p>Tell us a little about your event, collaboration, or promotional idea.</p>
        <a href="mailto:emailmaicha@gmail.com">emailmaicha@gmail.com</a>
      </div>
      <form className="enquiry-form" onSubmit={handleSubmit}>
        <label>
          YOUR NAME
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          EMAIL ADDRESS
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          WHAT’S ON YOUR MIND?
          <select name="type" defaultValue="Café experience or gathering">
            <option>Café experience or gathering</option>
            <option>Brand collaboration</option>
            <option>Promotional partnership</option>
            <option>Something else</option>
          </select>
        </label>
        <label>
          A FEW DETAILS
          <textarea name="message" rows="4" required />
        </label>
        <button type="submit">OPEN EMAIL TO SEND <span aria-hidden="true">↗</span></button>
        <p>This opens your email app with the message details. Nothing is submitted to a website.</p>
      </form>
    </section>
  )
}

function SiteFooter() {
  return (
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
  )
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <PourSection />
      <SpaceSection />
      <OrderOnline />
      <CustomerReviews />
    </>
  )
}

function AboutPage() {
  return (
    <>
      <AboutStorySection />
      <MascotStory />
      <OriginSection />
    </>
  )
}

function ExperiencesPage() {
  return (
    <>
      <ExperienceIntro />
      <SpaceSection />
      <WorkshopFeature />
      <CollaborationSection />
      <EnquirySection />
    </>
  )
}

function GamePage() {
  return <MatchaMixer />
}

function RecommendationPage() {
  return <MatchaRecommendationPage />
}

function App() {
  const root = useRef(null)
  const path = window.location.pathname.replace(/\/+$/, '')
  const page = path === siteUrls.about.replace(/\/+$/, '')
    ? 'about'
    : path === siteUrls.experiences.replace(/\/+$/, '')
      ? 'experiences'
      : path === siteUrls.game.replace(/\/+$/, '')
        ? 'game'
        : path === siteUrls.gallery.replace(/\/+$/, '')
          ? 'gallery'
          : path === siteUrls.recommendation.replace(/\/+$/, '')
            ? 'recommendation'
            : 'home'

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      if (root.current.querySelector('.hero-logo')) {
        gsap.from('.hero-logo', { y: 30, scale: 0.92, opacity: 0, duration: 1.1, ease: 'back.out(1.2)' })
        gsap.from('.hero-title .word', { y: 80, opacity: 0, stagger: 0.1, duration: 1, delay: 0.25, ease: 'power3.out' })
        gsap.from('.hero-cup', { y: 130, rotate: 8, opacity: 0, duration: 1.4, delay: 0.35, ease: 'power3.out' })
      }

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

  const Page = page === 'about'
    ? AboutPage
    : page === 'experiences'
      ? ExperiencesPage
      : page === 'game'
        ? GamePage
        : page === 'gallery'
          ? GalleryPage
          : page === 'recommendation'
            ? RecommendationPage
            : HomePage

  return (
    <main ref={root}>
      <Navigation page={page} />
      <Page />
      <SiteFooter />
    </main>
  )
}

export default App
