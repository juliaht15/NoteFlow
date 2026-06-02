async function seed() {
  for(let i=0; i<3000; i++) {
    await fetch('https://noteflow-gpqg.onrender.com/api/notes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ title: `Nota ${i}`, type: 'note', content: 'Contenido' })
    });
    if (i % 100 === 0) console.log(`Progreso: ${i}/3000`);
    await new Promise(r => setTimeout(r, 100)); // Espera 100ms entre cada una
  }
  console.log("¡Terminado!");
}
seed();