const add = document.getElementById('add');
const navigation = document.querySelector('#navigation');

add.addEventListener('click', () => window.location = 'Info/index.html')

db.collection('brand').get().then(snapshot => snapshot.docs.forEach(doc => {
  const p = document.createElement('p');
  p.textContent = doc.data().brand_name;
  p.setAttribute('doc-id', doc.id);
  p.setAttribute('class', 'click');
  navigation.appendChild(p);

  const clicks = document.getElementsByClassName('click');
  const properties = []

  for(let i = 0; i < Object.keys(clicks).length; i++){
    properties.push(clicks[i]);
  }

  properties.forEach(property => {
    property.addEventListener('click', () => {
      console.log(property.getAttribute('doc-id'));
      db.collection('send').doc('8BsxG90PmYJDOXzLVn80').update({
        id: property.getAttribute('doc-id')
      });
      setTimeout(() =>  window.location = 'brand/index.html', 500);
    });
  });
}));

db.collection('spec').get().then(snapshot => {
  const indices = [];
  while(indices.length < 3){
    const element = Math.floor(Math.random() * snapshot.docs.length);
    if(indices.every(index => index !== element)){
      indices.push(element);
    }
  }
  
  const random = document.querySelector('#random');
  random.setAttribute('id', 'spec');

  indices.forEach(index => {
    const section = document.createElement('section');
    section.style.display = 'flex';
    const img = document.createElement('img');
    img.src = snapshot.docs[index].data().url;
    img.alt = snapshot.docs[index].data().name;
    img.setAttribute('class', 'img');
    img.addEventListener('click', () => {
      db.collection('send').doc('g1wvRvJlWTj8A0VCbKLe').update({
        id: snapshot.docs[index].id,
        fromHome: true
      });

      setTimeout(() => window.location = 'spec/index.html', 500);
    });

    const properties = [
      {
        name: 'Name',
        value: snapshot.docs[index].data().name
      },
      {
        name: 'RAM',
        value: `${snapshot.docs[index].data().memory_type} ${snapshot.docs[index].data().installed_memory}`
      },
      {
        name: 'CPU',
        value: snapshot.docs[index].data().cpu
      },
      {
        name: 'HDD',
        value: snapshot.docs[index].data().hdd
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
    random.append(section);
  });
});