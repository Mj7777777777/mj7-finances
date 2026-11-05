import * as THREE from 'three';

export interface Bar { id: string; name: string; icon: string; color: string; amount: number }
export interface Scene3D { update(bars: Bar[]): void; drop(id: string): void; setTheme(dark: boolean): void; dispose(): void }

const COIN_H = 0.11, COIN_R = 0.42, MAX_COINS = 26;

export function webglOK(): boolean {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
}

export function createScene(host: HTMLElement, cb: { onHover(b: Bar | null, x: number, y: number): void; onPick(id: string): void }): Scene3D {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  const target = new THREE.Vector3(0, 1.3, 0);

  // lumières : clé chaude, contre-jour orange, ambiance
  const hemi = new THREE.HemisphereLight(0xfff1dd, 0x1a0f08, 0.55); scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffe2b8, 2.4); key.position.set(4, 8, 5); key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024); Object.assign(key.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7 }); scene.add(key);
  const rim = new THREE.PointLight(0xff7a1a, 26, 18); rim.position.set(-4, 3, -4); scene.add(rim);
  const fill = new THREE.PointLight(0xe8c27e, 10, 14); fill.position.set(3, 1.2, 4); scene.add(fill);

  // sol : disque sombre + anneaux lumineux
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x0f0c0b, roughness: 0.55, metalness: 0.4 });
  const floor = new THREE.Mesh(new THREE.CircleGeometry(9, 96), floorMat);
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xff9a3d, transparent: true, opacity: 0.35 });
  [3.2, 4.6, 6.2].forEach((r, i) => {
    const ring = new THREE.Mesh(new THREE.RingGeometry(r, r + 0.012 + i * 0.004, 160), ringMat.clone());
    (ring.material as THREE.MeshBasicMaterial).opacity = 0.32 - i * 0.09;
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.002; scene.add(ring);
  });

  // particules dorées
  const pg = new THREE.BufferGeometry(); const pn = 160; const pp = new Float32Array(pn * 3);
  for (let i = 0; i < pn; i++) { const a = Math.random() * Math.PI * 2, r = 1.5 + Math.random() * 6; pp[i * 3] = Math.cos(a) * r; pp[i * 3 + 1] = Math.random() * 5; pp[i * 3 + 2] = Math.sin(a) * r; }
  pg.setAttribute('position', new THREE.BufferAttribute(pp, 3));
  const dust = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xe8c27e, size: 0.035, transparent: true, opacity: 0.6, depthWrite: false }));
  scene.add(dust);

  const coinGeo = new THREE.CylinderGeometry(COIN_R, COIN_R, COIN_H * 0.86, 40);
  const group = new THREE.Group(); scene.add(group);

  interface Col { bar: Bar; mesh: THREE.InstancedMesh; mat: THREE.MeshStandardMaterial; pos: THREE.Vector3; n: number; shown: number; hover: number; jit: number[]; base: THREE.Mesh }
  let cols: Col[] = [];
  const drops: { mesh: THREE.Mesh; col: Col; t: number; y0: number; y1: number }[] = [];

  function coinColor(hex: string) {
    const c = new THREE.Color(hex); c.lerp(new THREE.Color(0xe8c27e), 0.35); return c;
  }

  function build(bars: Bar[]) {
    const prev = new Map(cols.map(c => [c.bar.id, c.shown]));
    cols.forEach(c => { group.remove(c.mesh); group.remove(c.base); c.mesh.dispose(); c.mat.dispose(); (c.base.material as THREE.Material).dispose(); });
    cols = [];
    const list = bars.filter(b => b.amount > 0).sort((a, b) => b.amount - a.amount).slice(0, 9);
    const max = Math.max(1, ...list.map(b => b.amount));
    const n = list.length;
    const gap = 1.18;
    list.forEach((bar, i) => {
      const x = (i - (n - 1) / 2) * gap;
      const pos = new THREE.Vector3(x, 0, -0.09 * x * x + (i % 2 ? -0.35 : 0.2));
      const count = Math.max(1, Math.round((bar.amount / max) * MAX_COINS));
      const mat = new THREE.MeshStandardMaterial({ color: coinColor(bar.color), metalness: 0.85, roughness: 0.28, emissive: new THREE.Color(bar.color), emissiveIntensity: 0.06 });
      const mesh = new THREE.InstancedMesh(coinGeo, mat, MAX_COINS + 4);
      mesh.castShadow = true; mesh.receiveShadow = true; mesh.count = 0; mesh.userData.colIndex = i;
      const base = new THREE.Mesh(new THREE.CylinderGeometry(COIN_R * 1.35, COIN_R * 1.5, 0.05, 48),
        new THREE.MeshStandardMaterial({ color: 0x1b1512, metalness: 0.6, roughness: 0.4, emissive: new THREE.Color(bar.color), emissiveIntensity: 0.25 }));
      base.position.copy(pos).setY(0.025); base.receiveShadow = true; base.userData.colIndex = i;
      group.add(mesh); group.add(base);
      cols.push({ bar, mesh, mat, pos, n: count, shown: Math.min(count, prev.get(bar.id) ?? 0), hover: 0, jit: Array.from({ length: MAX_COINS + 4 }, () => (Math.random() - 0.5) * 0.05), base });
    });
  }

  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s1 = new THREE.Vector3(1, 1, 1), v = new THREE.Vector3();
  function layout(reset = false) {
    cols.forEach(c => { if (reset) c.shown = 0; });
  }
  function writeCol(c: Col) {
    const k = Math.floor(c.shown);
    c.mesh.count = k;
    for (let i = 0; i < k; i++) {
      v.set(c.pos.x + c.jit[i], 0.05 + COIN_H * (i + 0.5) + c.hover * i * 0.012, c.pos.z + c.jit[(i + 7) % c.jit.length]);
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), i * 0.4);
      m4.compose(v, q, s1); c.mesh.setMatrixAt(i, m4);
    }
    c.mesh.instanceMatrix.needsUpdate = true;
  }

  // ---- interaction : rotation au doigt/souris + survol ----
  let yaw = 0.3, pitch = 0.36, dist = 10.5, auto = true, dragging = false, moved = 0, lx = 0, ly = 0, lastInteract = 0;
  const ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
  let hovered = -1;
  const el = renderer.domElement;
  el.style.touchAction = 'pan-y';
  el.addEventListener('pointerdown', e => { dragging = true; moved = 0; lx = e.clientX; ly = e.clientY; auto = false; lastInteract = performance.now(); });
  window.addEventListener('pointerup', () => { dragging = false; });
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    if (dragging) {
      const dx = e.clientX - lx, dy = e.clientY - ly; moved += Math.abs(dx) + Math.abs(dy);
      yaw -= dx * 0.008; pitch = Math.max(0.12, Math.min(0.95, pitch + dy * 0.004)); lx = e.clientX; ly = e.clientY; lastInteract = performance.now();
    }
    mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    pick(e.clientX - r.left, e.clientY - r.top);
  });
  el.addEventListener('pointerleave', () => { hovered = -1; cb.onHover(null, 0, 0); });
  el.addEventListener('click', e => {
    if (moved > 8) return;
    const r = el.getBoundingClientRect();
    mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    const i = pick(e.clientX - r.left, e.clientY - r.top);
    if (i >= 0) cb.onPick(cols[i].bar.id);
  });
  el.addEventListener('wheel', e => { dist = Math.max(6, Math.min(14, dist + e.deltaY * 0.004)); e.preventDefault(); }, { passive: false });

  function pick(x: number, y: number): number {
    ray.setFromCamera(mouse, camera);
    const hits = ray.intersectObjects(cols.flatMap(c => [c.mesh, c.base]), false);
    const i = hits.length ? (hits[0].object.userData.colIndex as number) : -1;
    if (i !== hovered) { hovered = i; el.style.cursor = i >= 0 ? 'pointer' : 'grab'; }
    cb.onHover(i >= 0 ? cols[i].bar : null, x, y);
    return i;
  }

  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h;
    camera.fov = w < 520 ? 44 : 36; camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize); ro.observe(host); resize();

  let raf = 0, last = performance.now(), visible = true;
  const io = new IntersectionObserver(es => { visible = es[0].isIntersecting; }); io.observe(host);
  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!visible || document.hidden) return;
    if (!auto && now - lastInteract > 6000) auto = true;
    if (auto) yaw += dt * 0.12;
    const d = dist * (camera.aspect < 1.2 ? 1.35 : 1);
    camera.position.set(Math.sin(yaw) * Math.cos(pitch) * d, target.y + Math.sin(pitch) * d, Math.cos(yaw) * Math.cos(pitch) * d);
    camera.lookAt(target);
    cols.forEach((c, i) => {
      const goal = c.n;
      if (c.shown < goal) c.shown = Math.min(goal, c.shown + dt * (14 + goal * 0.8));
      if (c.shown > goal) c.shown = goal;
      const h = i === hovered ? 1 : 0; c.hover += (h - c.hover) * Math.min(1, dt * 10);
      c.mat.emissiveIntensity = 0.06 + c.hover * 0.45;
      writeCol(c);
    });
    for (let k = drops.length - 1; k >= 0; k--) {
      const dr = drops[k]; dr.t += dt;
      const p = Math.min(1, dr.t / 0.7);
      const e = p < 1 ? p * p : 1;
      const bounce = p >= 1 ? Math.max(0, Math.sin((dr.t - 0.7) * 18) * 0.12 * Math.exp(-(dr.t - 0.7) * 8)) : 0;
      dr.mesh.position.y = dr.y0 + (dr.y1 - dr.y0) * e + bounce;
      dr.mesh.rotation.x = (1 - e) * 6; dr.mesh.rotation.z = (1 - e) * 3;
      if (dr.t > 1.1) { group.remove(dr.mesh); (dr.mesh.material as THREE.Material).dispose(); drops.splice(k, 1); dr.col.n = Math.min(MAX_COINS + 4, dr.col.n + 0); }
    }
    dust.rotation.y += dt * 0.02;
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(frame);

  return {
    update(bars) { build(bars); },
    drop(id) {
      const c = cols.find(x => x.bar.id === id); if (!c) return;
      const mesh = new THREE.Mesh(coinGeo, c.mat.clone()); mesh.castShadow = true;
      mesh.position.set(c.pos.x, 5, c.pos.z); group.add(mesh);
      drops.push({ mesh, col: c, t: 0, y0: 5, y1: 0.05 + COIN_H * (c.n + 0.5) });
    },
    setTheme(dark) {
      floorMat.color.set(dark ? 0x0f0c0b : 0xe9e1d6); hemi.intensity = dark ? 0.55 : 1.1;
    },
    dispose() { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); renderer.dispose(); host.innerHTML = ''; },
  };
}
