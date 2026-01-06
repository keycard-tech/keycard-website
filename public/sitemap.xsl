<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="sm xhtml">
  <xsl:output method="html" indent="yes" />

  <xsl:template match="/">
    <html>
      <head>
        <title>Keycard Sitemap</title>
        <style>
          body { font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; color: #111; margin: 24px; }
          h1 { font-size: 22px; margin: 0 0 12px; }
          p { margin: 0 0 16px; color: #444; }
          table { width: 100%; border-collapse: collapse; font-size: 13px; }
          th, td { border: 1px solid #ddd; padding: 8px; vertical-align: top; }
          th { background: #f4f4f4; text-align: left; }
          a { color: #0b57d0; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .muted { color: #666; }
          .alternates div { margin-bottom: 4px; }
        </style>
      </head>
      <body>
        <h1>Keycard Sitemap</h1>
        <p>
          URL count:
          <strong><xsl:value-of select="count(sm:urlset/sm:url)" /></strong>
        </p>
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Last modified</th>
              <th>Changefreq</th>
              <th>Priority</th>
              <th>Alternates</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="sm:urlset/sm:url">
              <tr>
                <td>
                  <a href="{sm:loc}"><xsl:value-of select="sm:loc" /></a>
                </td>
                <td class="muted"><xsl:value-of select="sm:lastmod" /></td>
                <td class="muted"><xsl:value-of select="sm:changefreq" /></td>
                <td class="muted"><xsl:value-of select="sm:priority" /></td>
                <td class="alternates">
                  <xsl:for-each select="xhtml:link">
                    <div>
                      <strong><xsl:value-of select="@hreflang" />:</strong>
                      <xsl:text> </xsl:text>
                      <xsl:value-of select="@href" />
                    </div>
                  </xsl:for-each>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
