<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:variable name="raw">
    <xsl:choose>
      <xsl:when test="/*[local-name()='sitemapindex']">sitemap-0.xml</xsl:when>
      <xsl:otherwise>sitemap-index.xml</xsl:otherwise>
    </xsl:choose>
  </xsl:variable>

  <xsl:template match="/*[local-name()='sitemapindex']">
    <xsl:variable name="total" select="count(*[local-name()='sitemap'])" />
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Mapa do site — Destrava Tech</title>
        <style>
          :root { color-scheme: light; }
          * { box-sizing: border-box; }
          body { margin: 0; background: #fafafa; color: #09090b; font: 1rem/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; }
          .wrap { max-width: 68rem; margin-inline: auto; padding: 2.5rem 1.25rem 4rem; }
          .kicker { margin: 0 0 .5rem; font-size: .8rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #be185d; }
          h1 { font-family: Georgia, "Times New Roman", serif; font-size: clamp(2rem, 6vw, 3.5rem); line-height: 1.1; margin: 0 0 1rem; letter-spacing: -.02em; }
          .lead { max-width: 52ch; margin: 0 0 1.5rem; color: #475569; }
          .meta { display: flex; flex-wrap: wrap; gap: .5rem 1rem; align-items: baseline; margin: 0 0 2rem; padding-block: .75rem; border-block: 1px solid #e4e4e7; font-size: .95rem; }
          .meta strong { font-size: 1.35rem; }
          a { color: #be185d; text-decoration-thickness: .08em; text-underline-offset: .18em; }
          a:focus-visible { outline: 3px solid #18181b; outline-offset: 3px; }
          ol { list-style: none; margin: 0; padding: 0; display: grid; gap: .75rem; }
          li { background: #ffffff; border: 1px solid #e4e4e7; border-radius: .5rem; padding: 1rem 1.15rem; display: flex; flex-wrap: wrap; gap: .35rem .85rem; align-items: baseline; }
          li a { font-weight: 600; overflow-wrap: anywhere; }
          .hint { color: #475569; font-size: .9rem; }
          footer { margin-top: 2.5rem; padding-top: 1rem; border-top: 1px solid #e4e4e7; color: #475569; font-size: .9rem; }
          @media (prefers-color-scheme: dark) {
            :root { color-scheme: dark; }
            body { background: #09090b; color: #fafafa; }
            .lead, .hint, footer { color: #94a3b8; }
            .kicker, a { color: #f472b6; }
            .meta { border-color: #3f3f46; }
            li { background: #18181b; border-color: #3f3f46; }
            footer { border-color: #3f3f46; }
            a:focus-visible { outline-color: #ffffff; }
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <header>
            <p class="kicker">Destrava Tech · índice de páginas</p>
            <h1>Mapa do site</h1>
            <p class="lead">Este é o índice que os mecanismos de busca leem. A versão de texto puro continua disponível para o Google.</p>
            <p class="meta"><strong><xsl:value-of select="$total" /></strong> arquivos de sitemap · <a href="{$raw}">ver XML cru</a></p>
          </header>
          <ol>
            <xsl:apply-templates select="*[local-name()='sitemap']" mode="sitemap" />
          </ol>
          <footer>Destrava Tech — tecnologia explicada sem complicação.</footer>
        </div>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="/*[local-name()='urlset']">
    <xsl:variable name="total" select="count(*[local-name()='url'])" />
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Mapa do site — Destrava Tech</title>
        <style>
          :root { color-scheme: light; }
          * { box-sizing: border-box; }
          body { margin: 0; background: #fafafa; color: #09090b; font: 1rem/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; }
          .wrap { max-width: 68rem; margin-inline: auto; padding: 2.5rem 1.25rem 4rem; }
          .kicker { margin: 0 0 .5rem; font-size: .8rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #be185d; }
          h1 { font-family: Georgia, "Times New Roman", serif; font-size: clamp(2rem, 6vw, 3.5rem); line-height: 1.1; margin: 0 0 1rem; letter-spacing: -.02em; }
          .lead { max-width: 52ch; margin: 0 0 1.5rem; color: #475569; }
          .meta { display: flex; flex-wrap: wrap; gap: .5rem 1rem; align-items: baseline; margin: 0 0 2rem; padding-block: .75rem; border-block: 1px solid #e4e4e7; font-size: .95rem; }
          .meta strong { font-size: 1.35rem; }
          a { color: #be185d; text-decoration-thickness: .08em; text-underline-offset: .18em; }
          a:focus-visible { outline: 3px solid #18181b; outline-offset: 3px; }
          ol { list-style: none; margin: 0; padding: 0; display: grid; gap: .5rem; }
          li { background: #ffffff; border: 1px solid #e4e4e7; border-radius: .5rem; padding: .8rem 1.15rem; display: flex; flex-wrap: wrap; gap: .35rem .85rem; align-items: baseline; }
          li a { font-weight: 600; overflow-wrap: anywhere; }
          .hint { color: #475569; font-size: .9rem; }
          .lang { border: 1px solid #e4e4e7; border-radius: 999px; padding: .05rem .5rem; font-size: .78rem; font-weight: 700; }
          footer { margin-top: 2.5rem; padding-top: 1rem; border-top: 1px solid #e4e4e7; color: #475569; font-size: .9rem; }
          @media (prefers-color-scheme: dark) {
            :root { color-scheme: dark; }
            body { background: #09090b; color: #fafafa; }
            .lead, .hint, footer { color: #94a3b8; }
            .kicker, a { color: #f472b6; }
            .meta { border-color: #3f3f46; }
            li { background: #18181b; border-color: #3f3f46; }
            .lang { border-color: #3f3f46; }
            footer { border-color: #3f3f46; }
            a:focus-visible { outline-color: #ffffff; }
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <header>
            <p class="kicker">Destrava Tech · índice de páginas</p>
            <h1>Mapa do site</h1>
            <p class="lead">Guias, páginas fixas e versões em inglês e espanhol. O endereço de cada linha abre a página correspondente.</p>
            <p class="meta"><strong><xsl:value-of select="$total" /></strong> endereços · <a href="{$raw}">ver XML cru</a></p>
          </header>
          <ol>
            <xsl:apply-templates select="*[local-name()='url']" mode="url" />
          </ol>
          <footer>Destrava Tech — tecnologia explicada sem complicação.</footer>
        </div>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="*[local-name()='sitemap']" mode="sitemap">
    <xsl:variable name="loc" select="*[local-name()='loc']" />
    <xsl:variable name="path" select="concat('/', substring-after(substring-after($loc, '://'), '/'))" />
    <li>
      <a href="{$loc}"><xsl:value-of select="$path" /></a>
      <xsl:if test="*[local-name()='lastmod']">
        <span class="hint">atualizado em <xsl:value-of select="substring(*[local-name()='lastmod'], 1, 10)" /></span>
      </xsl:if>
    </li>
  </xsl:template>

  <xsl:template match="*[local-name()='url']" mode="url">
    <xsl:variable name="loc" select="*[local-name()='loc']" />
    <xsl:variable name="path" select="concat('/', substring-after(substring-after($loc, '://'), '/'))" />
    <li>
      <a href="{$loc}"><xsl:value-of select="$path" /></a>
      <xsl:for-each select="*[local-name()='link']">
        <span class="lang"><xsl:value-of select="@hreflang" /></span>
      </xsl:for-each>
      <xsl:if test="*[local-name()='lastmod']">
        <span class="hint"><xsl:value-of select="substring(*[local-name()='lastmod'], 1, 10)" /></span>
      </xsl:if>
    </li>
  </xsl:template>
</xsl:stylesheet>
