# Fill the migration decisions: every old unit, page and image gets its place on the new site. Re-running migration-map.mjs clears them; run this again after it.
import csv, re
D = 'knowledge-base/migration/'
URL = {'/': '/', '/service': '/solutions/', '/use-cases': '/projects/', '/opc': '/one-person-business/', '/community': '/community/', '/about': '/about/', '/contact': '/contact/',
       '/workshop': '/workshops/', '/events': '/events/', '/blog': '/blog/', '/faq': '/faq/', '/blog/top-ai-meetups-in-sydney': '/blog/top-ai-meetups-in-sydney/',
       '/blog/how-to-learn-ai-in-sydney-2026-guide': '/blog/how-to-learn-ai-in-sydney-2026-guide/', '/blog/best-ai-networking-events-in-sydney': '/blog/best-ai-networking-events-in-sydney/'}
def rd(f):
    with open(D + f, encoding='utf-8-sig', newline='') as h:
        r = csv.DictReader(h); return r.fieldnames, list(r)
def wr(f, head, rows):
    with open(D + f, 'w', encoding='utf-8-sig', newline='') as h:
        w = csv.DictWriter(h, head); w.writeheader(); w.writerows(rows)

head, U = rd('units.csv')
for u in U:
    n = int(u['unit'][1:]); r = u['route']
    u['new_page'] = URL.get(r, '/projects/'); sec = u['section'].split(' › ')[-1]
    u['new_section'] = sec[:60]; u['action'] = 'rewrite'; u['notes'] = ''
    if u['type'] == 'meta': u['new_section'] = 'page title and description'
    if u['duplicate_of']: u['action'] = 'merge'; u['notes'] = 'same text as ' + u['duplicate_of'] + ', one source'
    if 155 <= n <= 160: u['action'] = 'merge'; u['notes'] = 'structured copy of the visible question, one source'
    if 123 <= n <= 134: u['action'] = 'keep'; u['notes'] = 'article text the old site never showed; published on the new site, owner to confirm'
    if n == 135: u['new_page'] = '/events/'; u['new_section'] = 'Why people join'; u['action'] = 'merge'; u['notes'] = 'unreachable old page, content folded in'
    if n == 136: u['new_page'] = '/events/'; u['new_section'] = 'Why people join'; u['action'] = 'merge'; u['notes'] = 'unreachable old page, content folded in'
    if n == 137: u['new_page'] = '/faq/'; u['new_section'] = 'Learn AI'; u['action'] = 'merge'; u['notes'] = 'unreachable old page, content folded in'
    if 144 <= n <= 153: u['new_page'] = '/projects/'; u['action'] = 'keep-link'; u['notes'] = 'stays on its own site, we link to it'
    if n == 154: u['new_page'] = '(all)'; u['new_section'] = 'header and footer'
    if 138 <= n <= 143: u['action'] = 'keep'; u['notes'] = 'planner output kept word for word, checked against the captured plans'
wr('units.csv', head, U)

head, P = rd('pages.csv')
for p in P:
    p['new_url'] = URL[p['route']]; p['redirect_needed'] = 'yes, in the browser from /#' + p['route'] + ' (the part after # never reaches a server)'
wr('pages.csv', head, P)

head, I = rd('images.csv')
USE = {'logo': ('header, footer', 'NextGenius logo', 'yes'), 'favicon': ('browser tab', '', 'yes'), 'case-screenshot': ('', '', 'no, replaced by a clip of the app'),
       'process-flow': ('', '', 'no, shows an unrelated diagram'), 'video-collage': ('', '', 'no, shows unrelated thumbnails'), 'service-': ('', '', 'no, decorative picture unrelated to the service'),
       'product-': ('', '', 'no, thin background strip'), 'city-': ('', '', 'no, replaced by our own art')}
for i in I:
    f = i['file']; hit = next((v for k, v in USE.items() if f.startswith(k)), None)
    if f.startswith('workshop'): hit = ('workshops gallery, about, community, home', 'People at a NextGenius workshop session', 'yes')
    if f.startswith('_'): hit = ('', '', 'no, internal sheet')
    i['new_use'], i['new_alt'], i['keep'] = hit
wr('images.csv', head, I)
print('filled', len(U), 'units', len(P), 'pages', len(I), 'images')
