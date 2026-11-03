// Navigation, company carousel and forms. Content remains available without JavaScript.
(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Reveal content once on entry; it stays visible if motion or scripting is unavailable.
  const scrollMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !scrollMotion.matches) {
    const groups = ['.service-list', '.process-grid', '.story-grid', '.cols', '.blog-grid'];
    const cards = groups.flatMap(selector => $$(selector + ' > *'));
    const candidates = new Set([...$$('main > section, main > .blog-stories > section'), ...$$('main section h2'), ...cards, ...$$('main .case')]);
    const targets = [...candidates].filter(element => {
      for (let parent = element.parentElement; parent; parent = parent.parentElement) {
        if (candidates.has(parent)) return false;
      }
      return !element.closest('.feature, .phero, .body, .rel, .client-section');
    });
    cards.forEach(element => {
      const index = [...element.parentElement.children].indexOf(element);
      element.style.setProperty('--reveal-delay', Math.min(index, 3) * 45 + 'ms');
    });
    const finish = element => element.classList.remove('scroll-pending', 'scroll-visible');
    const observer = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach(({ target }) => {
        observer.unobserve(target);
        if (target.contains(document.activeElement)) { finish(target); return; }
        target.classList.add('scroll-visible');
        target.addEventListener('transitionend', () => finish(target), { once: true });
      });
    }, { threshold: 0, rootMargin: '0px 0px 64px 0px' });
    targets.forEach(element => {
      // Keep the first screen and direct anchor destinations immediately readable.
      if (element.getBoundingClientRect().top >= innerHeight + 64) {
        element.classList.add('scroll-pending');
        observer.observe(element);
      }
    });
    document.addEventListener('focusin', event => {
      const target = event.target.closest('.scroll-pending');
      if (target) finish(target);
    });
    const revealDestination = () => {
      let destination;
      try { destination = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch { return; }
      if (!destination) return;
      targets.filter(element => element === destination || element.contains(destination) || destination.contains(element)).forEach(element => {
        observer.unobserve(element);
        finish(element);
      });
    };
    addEventListener('hashchange', revealDestination);
    revealDestination();
    scrollMotion.addEventListener('change', event => {
      if (!event.matches) return;
      observer.disconnect();
      $$('.scroll-pending').forEach(finish);
    });
  }

  // Duplicate the runway for a seamless loop; assistive technology reads each brand once.
  const clientTrack = $('#client-logos');
  if (clientTrack) {
    const items = $$('li', clientTrack), reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const copies = items.map(item => {
      const copy = item.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      clientTrack.append(copy);
      return copy;
    });
    let loopWidth = 0, offset = 0, lastTime = 0, frame = 0, running = false;
    let userPaused = reducedMotion.matches, focused = false, inView = false, interacting = false, interactionTimer;
    const tick = time => {
      if (lastTime) offset = (offset + Math.min(time - lastTime, 64) * .036) % loopWidth;
      lastTime = time;
      place();
      frame = requestAnimationFrame(tick);
    };
    // A transform moves in fractions of a pixel; scrollLeft only in whole ones, which made the row stutter.
    const place = () => { clientTrack.style.transform = `translate3d(${-offset}px,0,0)`; };
    const sync = () => {
      const shouldRun = loopWidth > 0 && !userPaused && !focused && inView && !document.hidden && !interacting;
      if (shouldRun && !running) {
        lastTime = 0;
        frame = requestAnimationFrame(tick);
      } else if (!shouldRun && running) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      running = shouldRun;
      clientTrack.dataset.animating = String(running);
    };
    const measure = () => {
      loopWidth = copies[0].getBoundingClientRect().left - items[0].getBoundingClientRect().left;
      offset = loopWidth ? offset % loopWidth : 0;
      place();
      sync();
    };
    const hold = () => {
      interacting = true;
      sync();
      clearTimeout(interactionTimer);
      interactionTimer = setTimeout(() => { interacting = false; sync(); }, 3000);
    };
    // Pointer focus must not leave the carousel paused after a touch scroll.
    clientTrack.addEventListener('focusin', () => { focused = clientTrack.matches(':focus-visible'); sync(); });
    clientTrack.addEventListener('focusout', () => { focused = false; sync(); });
    clientTrack.addEventListener('pointerdown', hold);
    clientTrack.addEventListener('pointerup', hold);
    clientTrack.addEventListener('keydown', event => {
      focused = true;
      sync();
      if (event.code === 'Space') { event.preventDefault(); userPaused = !userPaused; sync(); }
      else if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
        event.preventDefault();
        offset = (offset + (event.code === 'ArrowRight' ? 160 : -160) + loopWidth) % loopWidth;
        place();
      } else hold();
    });
    reducedMotion.addEventListener('change', event => { userPaused = event.matches; sync(); });
    document.addEventListener('visibilitychange', sync);
    // Observe the stationary viewport: the translated track eventually moves offscreen.
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; sync(); }).observe(clientTrack.closest('.client-viewport'));
    new ResizeObserver(measure).observe(clientTrack);
    measure();
  }

  // Preserve links from the previous single-page website.
  const oldPaths = { '/service': '/solutions/', '/use-cases': '/solutions/', '/projects': '/solutions/', '/opc': '/partners/', '/one-person-business': '/partners/', '/one-person-business/zh': '/partners/', '/workshop': '/workshops/', '/blog/top-ai-meetups-in-sydney': '/events/', '/blog/how-to-learn-ai-in-sydney-2026-guide': '/workshops/', '/blog/best-ai-networking-events-in-sydney': '/events/' };
  if (location.pathname === '/' && location.hash.startsWith('#/')) {
    const path = location.hash.slice(1).replace(/\/$/, '');
    location.replace(oldPaths[path] || path + '/');
    return;
  }

  // Accordions expose their state to assistive technology.
  $$('.row').forEach((row, index) => {
    const button = $('button', row), panel = $('.body', row);
    if (!button || !panel) return;
    panel.id ||= 'row-panel-' + index;
    button.setAttribute('aria-controls', panel.id);
    const set = open => {
      row.classList.toggle('open', open);
      button.setAttribute('aria-expanded', String(open));
      panel.inert = !open;
    };
    button.addEventListener('click', () => set(!row.classList.contains('open')));
    set(row.classList.contains('open'));
  });
  const openAddressedRow = () => {
    if (location.hash.length < 2) return;
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const row = document.getElementById(id)?.closest('.row');
    if (!row?.classList.contains('row')) return;
    row.classList.add('open');
    $('button', row)?.setAttribute('aria-expanded', 'true');
    const panel = $('.body', row);
    if (panel) panel.inert = false;
  };
  addEventListener('hashchange', openAddressedRow);
  openAddressedRow();

  const menuButton = $('#mbtn'), menu = $('#mm');
  if (menuButton && menu) {
    const setMenu = open => {
      document.body.classList.toggle('menu', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? 'Close' : 'Menu';
      menu.inert = !open;
      $('main').inert = open;
      $('footer').inert = open;
    };
    setMenu(false);
    menuButton.addEventListener('click', () => setMenu(!document.body.classList.contains('menu')));
    $$('#mm a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    addEventListener('keydown', event => {
      if (!document.body.classList.contains('menu')) return;
      if (event.key === 'Escape') {
        setMenu(false);
        menuButton.focus();
      }
      if (event.key === 'Tab') {
        const targets = [menuButton, ...$$('summary, a', menu).filter(el => el.getClientRects().length)];
        const first = targets[0], last = targets.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }
    });
    matchMedia('(min-width: 1101px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
  }

  // Keep the form available on failure; success requires an explicit API receipt.
  $$('form[data-enquiry]').forEach(form => form.addEventListener('submit', async event => {
    event.preventDefault();
    const button = $('button[type="submit"]', form), status = $('.form-status', form);
    if (button.disabled) return;
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    $('.tx', button).textContent = 'Sending…';
    status.hidden = false;
    status.textContent = 'Sending your enquiry…';
    status.dataset.state = 'pending';
    try {
      const response = await fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form), signal: AbortSignal.timeout(12000) });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) throw new Error(result?.message || 'Your enquiry could not be sent. Please try again or email info@nextgenius.com.au directly.');
      status.textContent = result.message;
      status.dataset.state = 'success';
      form.reset();
    } catch (error) {
      status.textContent = error.name === 'TimeoutError' || error.name === 'AbortError' ? 'We could not confirm delivery. Your details are still here; retry the same enquiry or email info@nextgenius.com.au directly.' : (error.message === 'Failed to fetch' ? 'We could not connect. Your details are still here; check your connection and try again, or email info@nextgenius.com.au.' : error.message);
      status.dataset.state = 'error';
    } finally {
      button.disabled = false;
      form.removeAttribute('aria-busy');
      $('.tx', button).textContent = 'Send enquiry';
      status.focus();
    }
  }));
})();
