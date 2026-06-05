// tweaks-app.jsx — mounts the Tweaks panel and applies values to the deck.
// Slides stay static HTML; this only writes CSS variables on <deck-stage>.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#f4f2ed",
  "titleSize": 68
}/*EDITMODE-END*/;

function applyVars(t) {
  const stage = document.querySelector('deck-stage');
  if (!stage) return;
  stage.style.setProperty('--accent', t.accent);
  stage.style.setProperty('--t-title', t.titleSize + 'px');
}

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => { applyVars(t); }, [t]);
  return (
    <TweaksPanel>
      <TweakSection label="Accent" />
      <TweakColor label="Accent mark" value={t.accent}
        options={['#f4f2ed', '#3b82f6', '#f97316', '#10b981']}
        onChange={(v) => setTweak('accent', v)} />
      <TweakSection label="Typography" />
      <TweakSlider label="Title size" value={t.titleSize} min={52} max={88} step={2} unit="px"
        onChange={(v) => setTweak('titleSize', v)} />
    </TweaksPanel>
  );
}

(function mount() {
  const root = document.getElementById('tweaks-root');
  if (root && window.ReactDOM) ReactDOM.createRoot(root).render(<TweaksApp />);
})();
