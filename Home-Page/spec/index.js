db.collection('send').doc('g1wvRvJlWTj8A0VCbKLe').get().then(snapshot => {
  db.collection('spec').doc(snapshot.data().id).get().then(snapshot => {
    const head = document.querySelector('#head');
    const body = document.querySelector('#body');

    head.innerHTML = `Name: ${snapshot.data().name}`

    const section = document.createElement('section');
    section.setAttribute('id', 'spec');
    const img = document.createElement('img');
    img.src = snapshot.data().url;
    img.alt = snapshot.data().name;
    img.setAttribute('class', 'img');

    const properties = [
      {
        name: 'cpu',
        property: 'CPU'
      }, 
      {
        name: 'max_boost',
        property: 'Maximum Boost Speed'
      }, 
      {
        name: 'l3_cache',
        property: 'L3 Cache'
      }, 
      {
        name: 'memory_type',
        property: 'Memory Type'
      }, 
      {
        name: 'installed_memory',
        property: 'Total Installed Memory'
      },
      {
        name: 'memory_config',
        property: 'Memory Configuration'
      },
      {
        name: 'graphics_type',
        property: 'Graphics Type'
      },
      {
        name: 'gpu',
        property: 'GPU'
      },
      {
        name: 'hdd',
        property: 'HDD'
      }
    ];

    const table = document.createElement('table');
    table.style.marginLeft = '15px';

    properties.forEach(property => {
      const tr = document.createElement('tr');
      const name = document.createElement('td');
      const value = document.createElement('td');

      name.textContent = property.property;
      value.textContent = snapshot.data()[property.name];

      tr.appendChild(name);
      tr.appendChild(value);
      table.appendChild(tr);
    });
    section.appendChild(img);
    section.appendChild(table);
    body.append(section);
  });

  console.log(snapshot.data().fromHome);

  const rtn = document.querySelector('#return');
  rtn.addEventListener('click', () => snapshot.data().fromHome ? window.location = '../index.html' : window.location = '../brand/index.html');
});
