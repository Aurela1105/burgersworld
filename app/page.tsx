'use client'

import { useMemo, useState } from 'react'

import {
  Menu,
  ShoppingBag,
  UserRound,
  X,
  Plus,
  MapPin,
  ArrowRight,
  Heart,
  Star,
  Search,
} from 'lucide-react'

type Item = {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
}

const menu: Item[] = [
  {
    id: 1,
    name: 'The World Famous',
    description:
      'Two flame-grilled patties, American cheese, pickles, onions, lettuce and our signature sauce.',
    price: 8.99,
    category: 'Burgers',
    image: '/burgersworld/img1.webp',
  },
  {
    id: 2,
    name: 'Smoky BBQ Stack',
    description:
      'Double beef, smoked bacon, crispy onions, cheddar and smoky BBQ sauce.',
    price: 10.49,
    category: 'Burgers',
    image: '/burgersworld/worldsbbcstack.jpg',
  },
  {
    id: 3,
    name: 'Crispy Chicken Club',
    description:
      'Hand-breaded chicken, fresh lettuce, tomato, creamy ranch and toasted brioche.',
    price: 9.49,
    category: 'Chicken',
    image: '/burgersworld/crispychickenstack.webp',
  },
  {
    id: 4,
    name: 'Loaded Cheese Fries',
    description:
      'Golden fries piled high with melted cheddar, bacon and house sauce.',
    price: 4.99,
    category: 'Sides',
    image: '/burgersworld/loadecheesefries.webp',
  },
  {
    id: 5,
    name: 'Classic Shake',
    description:
      'Thick, creamy and blended fresh. Choose vanilla, chocolate or strawberry.',
    price: 4.49,
    category: 'Drinks',
    image: '/burgersworld/clasicshake.jpg',
  },
  {
    id: 6,
    name: 'Plant-Powered',
    description:
      'A juicy plant-based patty with fresh toppings and our tangy special sauce.',
    price: 9.99,
    category: 'Burgers',
    image: '/burgersworld/plantpowered.webp',
  },
]

const categories = ['Menu', 'Burgers', 'Chicken', 'Sides', 'Drinks']

export default function Page() {
  const [cart, setCart] = useState<Item[]>([])
  const [category, setCategory] = useState('Menu')
  const [menuOpen, setMenuOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')
  const [favorite, setFavorite] = useState<number[]>([])

  const filtered = useMemo(
    () =>
      menu.filter(
        (item) =>
          (category === 'Menu' || item.category === category) &&
          `${item.name} ${item.description}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [category, search],
  )

  const notify = (message: string) => {
    setToast(message)

    window.setTimeout(() => {
      setToast('')
    }, 2200)
  }

  const add = (item: Item) => {
    setCart((current) => [...current, item])
    notify(`${item.name} added to your order`)
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const showMenu = () => {
    document.getElementById('menu')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <div className="burger-app">
      {/* HEADER */}
      <header className="site-header">
        <button
          className="header-icon"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={25} />
        </button>

        <button
          className="wordmark"
          onClick={() => {
            setCategory('Menu')
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }}
        >
          BURGERS<span>WORLD</span>
        </button>

        <div className="header-actions">
          <button
            className="header-icon desktop-search"
            aria-label="Search"
            onClick={showMenu}
          >
            <Search size={20} />
          </button>

          <button
            className="header-icon"
            aria-label="Account"
            onClick={() => setAccountOpen(true)}
          >
            <UserRound size={21} />
          </button>

          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={17} />
            Cart <b>{cart.length}</b>
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow red">GOOD FOOD. GOOD MOOD.</p>

            <h1>
              Rise & shine
              <br />
              with a <em>better</em>
              <br />
              burger.
            </h1>

            <p className="hero-text">
              Fresh ingredients, flame-grilled flavor, and a little more joy
              in every bite.
            </p>

            <div className="hero-buttons">
              <button className="red-button" onClick={showMenu}>
                Order now <ArrowRight size={17} />
              </button>

              <button
                className="outline-button"
                onClick={() => setLocationOpen(true)}
              >
                <MapPin size={17} />
                Find a restaurant
              </button>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="/burgersworld/burgersworld-hero.png"
              alt="Cheeseburger with hash browns and coffee"
            />

            <span className="price-badge">
              FROM
              <br />
              <strong>$8.99</strong>
            </span>
          </div>
        </section>

        {/* PROMO */}
        <section className="promo-grid">
          <article className="promo-card yellow">
            <p className="eyebrow">MAKE IT A MEAL</p>

            <h2>
              Big flavor.
              <br />
              <strong>Small price.</strong>
            </h2>

            <button onClick={showMenu}>
              See the menu <ArrowRight size={15} />
            </button>
          </article>

          <article className="promo-card photo">
            <img
              src="/burgersworld/burgersworld-menu.png"
              alt="Burgers, fries and shakes"
            />

            <div>
              <p className="eyebrow">MADE FOR SHARING</p>

              <h2>
                More to love
                <br />
                <strong>at the table.</strong>
              </h2>
            </div>
          </article>
        </section>

        {/* MENU */}
        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WHAT ARE YOU CRAVING?</p>

              <h2>
                Pick your perfect bite<span>.</span>
              </h2>
            </div>

            <div className="search-box">
              <Search size={17} />

              <input
                aria-label="Search menu"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search menu"
              />
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="category-tabs">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? 'active' : ''}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* FOOD CARDS */}
          <div className="food-grid">
            {filtered.map((item) => (
              <article className="food-card" key={item.id}>
                <div className="food-art">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="food-image"
                  />

                  <button
                    className={`heart ${
                      favorite.includes(item.id) ? 'liked' : ''
                    }`}
                    aria-label={`Favorite ${item.name}`}
                    onClick={() =>
                      setFavorite((current) =>
                        current.includes(item.id)
                          ? current.filter((id) => id !== item.id)
                          : [...current, item.id],
                      )
                    }
                  >
                    <Heart
                      size={17}
                      fill={
                        favorite.includes(item.id)
                          ? 'currentColor'
                          : 'none'
                      }
                    />
                  </button>
                </div>

                <div className="food-details">
                  <div>
                    <h3>{item.name}</h3>

                    <p>{item.description}</p>
                  </div>

                  <strong className="food-price">
                    ${item.price.toFixed(2)}
                  </strong>
                </div>

                <button
                  className="add-button"
                  onClick={() => add(item)}
                >
                  <Plus size={16} />
                  Add to order
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* APP BANNER */}
        <section className="app-banner">
          <div>
            <p className="eyebrow red">BURGERSWORLD APP</p>

            <h2>
              Good things come
              <br />
              to those who <em>order.</em>
            </h2>

            <p>
              Get exclusive deals, earn rewards, and make your next order even
              better.
            </p>

            <button
              className="dark-button"
              onClick={() =>
                notify('App perks are coming your way!')
              }
            >
              Get the app <ArrowRight size={16} />
            </button>
          </div>

          <div className="phone-card">
            <div className="phone-notch" />

            <span>
              BURGER
              <br />
              <b>WORLD</b>
            </span>

            <div className="phone-burger">BURGER</div>

            <small>
              YOUR NEXT FAVORITE
              <br />
              IS WAITING
            </small>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-brand">
          BURGERS<span>WORLD</span>

          <p>Made with joy since 2026.</p>
        </div>

        <div>
          <h4>Explore</h4>

          <button
            onClick={() => {
              setCategory('Menu')
              showMenu()
            }}
          >
            Our menu
          </button>

          <button
            onClick={() =>
              notify('Rewards are launching soon.')
            }
          >
            Rewards
          </button>

          <button
            onClick={() =>
              notify('Catering inquiries are welcome.')
            }
          >
            Catering
          </button>
        </div>

        <div>
          <h4>Help</h4>

          <button onClick={() => setLocationOpen(true)}>
            Find a restaurant
          </button>

          <button
            onClick={() => notify('We are here to help.')}
          >
            Contact us
          </button>

          <button
            onClick={() => notify('Privacy center opened.')}
          >
            Privacy
          </button>
        </div>

        <div className="footer-social">
          <h4>Follow the flavor</h4>

          <button
            onClick={() =>
              notify('Thanks for following along.')
            }
          >
            Instagram
          </button>

          <button
            onClick={() =>
              notify('Thanks for following along.')
            }
          >
            TikTok
          </button>
        </div>
      </footer>

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <div
          className="drawer-backdrop"
          onClick={() => setMenuOpen(false)}
        >
          <aside
            className="drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={23} />
            </button>

            <span className="drawer-logo">
              BURGERS<span>WORLD</span>
            </span>

            <p className="eyebrow">Hungry for more?</p>

            {categories.map((item) => (
              <button
                className="drawer-link"
                key={item}
                onClick={() => {
                  setCategory(item)
                  setMenuOpen(false)
                  showMenu()
                }}
              >
                {item}
                <ArrowRight size={17} />
              </button>
            ))}

            <button
              className="drawer-link"
              onClick={() => {
                setAccountOpen(true)
                setMenuOpen(false)
              }}
            >
              Log in / Register
              <UserRound size={17} />
            </button>
          </aside>
        </div>
      )}

      {/* ACCOUNT MODAL */}
      {accountOpen && (
        <div
          className="modal-overlay"
          onClick={() => setAccountOpen(false)}
        >
          <div
            className="account-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setAccountOpen(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <p className="eyebrow red">
              WELCOME TO BURGERSWORLD
            </p>

            <h2>
              Your best bites
              <br />
              <em>start here.</em>
            </h2>

            <input
              placeholder="Email address"
              type="email"
            />

            <input
              placeholder="Password"
              type="password"
            />

            <button
              className="red-button"
              onClick={() => {
                setAccountOpen(false)
                notify('Welcome to Burgersworld!')
              }}
            >
              Log in <ArrowRight size={16} />
            </button>

            <button
              className="text-button"
              onClick={() =>
                notify('Registration is ready for you.')
              }
            >
              New here? Register
            </button>
          </div>
        </div>
      )}

      {/* LOCATION MODAL */}
      {locationOpen && (
        <div
          className="modal-overlay"
          onClick={() => setLocationOpen(false)}
        >
          <div
            className="account-modal location-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setLocationOpen(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <p className="eyebrow red">FIND YOUR FLAVOR</p>

            <h2>
              Where should we
              <br />
              <em>deliver joy?</em>
            </h2>

            <input placeholder="Enter city, state or ZIP code" />

            <button
              className="red-button"
              onClick={() => {
                setLocationOpen(false)
                notify('Showing restaurants near you.')
              }}
            >
              Find restaurants <MapPin size={16} />
            </button>
          </div>
        </div>
      )}

      {/* CART MODAL */}
      {cartOpen && (
        <div
          className="modal-overlay"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="cart-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setCartOpen(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <p className="eyebrow red">YOUR ORDER</p>

            <h2>
              Good choice<span>.</span>
            </h2>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={32} />

                <p>
                  Your bag is waiting for something delicious.
                </p>
              </div>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div
                    className="cart-line"
                    key={`${item.id}-${index}`}
                  >
                    <span>{item.name}</span>

                    <span>
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="cart-total">
                  <b>Total</b>

                  <b>${total.toFixed(2)}</b>
                </div>

                <button
                  className="red-button"
                  onClick={() => {
                    setCart([])
                    setCartOpen(false)
                    notify('Order started!')
                  }}
                >
                  Checkout <ArrowRight size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="toast-message">
          <Star size={16} fill="currentColor" />
          {toast}
        </div>
      )}
    </div>
  )
}