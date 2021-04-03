db.collection('send').doc('8BsxG90PmYJDOXzLVn80').get().then(snapshot => {
  db.collection('brand').doc(snapshot.data().id).get().then(snapshot => {
    const ids = [];
    for(let i = 1; i < Object.keys(snapshot.data()).length; i++){
      ids.push(snapshot.data()[`id${i}`]);
    }
    ids.forEach(id => {
      db.collection('spec').doc(id).get().then(snapshot => {
        const head = document.querySelector('#head');
        const body = document.querySelector('#body');
        head.innerHTML = `Brand: ${snapshot.data().brand}`
        
        const h3 = document.createElement('h3');
        h3.textContent = `Name: ${snapshot.data().name}`;
        h3.style.textAlign = 'center';

        h3.addEventListener('click', () => {
          console.log(id);
          db.collection('send').doc('g1wvRvJlWTj8A0VCbKLe').update({
            id: id,
            fromHome: false
          });

          setTimeout(() => window.location = '../spec/index.html', 500);
        });

        body.append(h3);
        
        const section = document.createElement('section');
        section.setAttribute('id', 'spec');
        const img = document.createElement('img');
        img.src = snapshot.data().url;
        img.alt = snapshot.data().name;
        img.setAttribute('class', 'img');
        img.addEventListener('click', () => {
          db.collection('send').doc('g1wvRvJlWTj8A0VCbKLe').update({
            id: id,
            fromHome: false
          });

          setTimeout(() => window.location = '../spec/index.html', 500);
        });

        const properties = [
          {
            name: 'Name',
            value: snapshot.data().name
          },
          {
            name: 'RAM',
            value: `${snapshot.data().memory_type} ${snapshot.data().installed_memory}`
          },
          {
            name: 'CPU',
            value: snapshot.data().cpu
          },
          {
            name: 'HDD',
            value: snapshot.data().hdd
          }
        ];

        const table = document.createElement('table');

        properties.forEach(property => {
          const tr = document.createElement('tr');
          const name = document.createElement('td');
          const value = document.createElement('td');

          name.textContent = property.name;
          value.textContent = property.value;

          tr.appendChild(name);
          tr.appendChild(value);
          table.appendChild(tr);
        })
        section.appendChild(img);
        section.appendChild(table);
        body.append(section);
      });
    });
  });
});

const rtn = document.querySelector('#return');

rtn.addEventListener('click', () => window.location = '../index.html');