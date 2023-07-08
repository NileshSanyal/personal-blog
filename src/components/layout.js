import * as React from "react"
import { Link } from "gatsby"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import IconButton from "@material-ui/core/IconButton"
import DarkModeIcon from '@mui/icons-material/DarkMode'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath} style={{
      backgroundColor: 'var(--bg)',
      color: 'var(--textNormal)',
      transition: 'color 0.2s ease-out, background 0.2s ease-out',
    }}>
      <header className="global-header">{header}</header>
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <div className="theme-toggler">

            <IconButton
              onClick={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
              component="span" color="success" style={{ color: "#66ff66" }}
            >
              <input
                type="checkbox"
                className="hide-togger"
                onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
                checked={theme === 'dark'}
              />{' '}
              <DarkModeIcon />
            </IconButton>

            {/* <label>
            <input
              type="checkbox"
              onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
              checked={theme === 'dark'}
            />{' '}
            Dark mode
          </label> */}
          </div>
        )}
      </ThemeToggler>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
