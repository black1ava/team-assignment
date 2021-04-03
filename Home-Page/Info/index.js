const form = document.querySelector("#form");
const brandsList = [];

db.collection('brand').get().then(snapshot => snapshot.docs.forEach(doc => brandsList.push({
  name: doc.data().brand_name,
  id: doc.id
})));

const labels = [
  {
    name: 'brand',
    label: 'Brand'
  },
  {
    name: 'name',
    label: 'Name'
  }, 
  {
    name: 'url',
    label: 'Image url'
  },
  {
    name: 'cpu',
    label: 'CPU'
  }, 
  {
    name: 'max_boost',
    label: 'Maximum Boost Speed'
  }, 
  {
    name: 'l3_cache',
    label: 'L3 Cache'
  }, 
  {
    name: 'memory_type',
    label: 'Memory Type'
  }, 
  {
    name: 'installed_memory',
    label: 'Total Installed Memory'
  },
  {
    name: 'memory_config',
    label: 'Memory Configuration'
  },
  {
    name: 'graphics_type',
    label: 'Graphics Type'
  },
  {
    name: 'gpu',
    label: 'GPU'
  },
  {
    name: 'hdd',
    label: 'HDD'
  }
];

labels.forEach(label => {
  const lb = document.createElement('label');
  lb.textContent = label.label;
  lb.style.fontSize = '16px';
  const input = document.createElement('input');
  input.type = 'text';
  input.name = label.name;
  input.placeholder = label.label;
  input.style.marginBottom = '15px';
  form.appendChild(lb);
  form.appendChild(input);
})

const button = document.createElement('button');
button.textContent = 'submit';
button.style.fontSize = '20px';
button.style.marginTop = '15px';
form.appendChild(button);

form.addEventListener('submit', e => {
  e.preventDefault();
   button.disabled = true;
  const dataList = [];
  const brand_name = form.brand.value.toUpperCase();
  labels.forEach(label => dataList.push(form[label.name].value))
    if(dataList.every(data => data !== "")){
    db.collection('spec').add({
      brand: brand_name,
      name: form.name.value,
      url: form.url.value,
      cpu: form.cpu.value,
      max_boost: form.max_boost.value,
      l3_cache: form.l3_cache.value,
      memory_type: form.memory_type.value,
      installed_memory: form.installed_memory.value,
      memory_config: form.memory_config.value,
      graphics_type: form.graphics_type.value,
      gpu: form.gpu.value,
      hdd: form.hdd.value
    });

    setTimeout(() => {
      if(brandsList.some(brand => brand.name === brand_name)){
        brandsList.forEach(brand => {
          if(brand.name === brand_name){
            db.collection('brand').doc(brand.id).get().then(snapshot => {
              const data = snapshot.data();
              db.collection('spec').get().then(snapshot => snapshot.docs.forEach(doc => {
                if(doc.data().name === form.name.value){
                  data[`id${Object.keys(data).length}`] = doc.id;
                  db.collection('brand').doc(brand.id).update(data);
                  setTimeout(() => {
                    window.location = '';
                  }, 1000);
                }
              }));
            });
          }
        });
      }else{
        const data = { brand_name: brand_name };
        db.collection('spec').get().then(snapshot => snapshot.docs.forEach(doc => {
          if(doc.data().name === form.name.value){
            data[`id${Object.keys(data).length}`] = doc.id;
            db.collection('brand').add(data);
            setTimeout(() => {
              window.location = '';
            }, 1000);
          }
        }));
      }
    }, 2000)
   }else{
     button.disabled = false;
     const span = document.querySelector('#span');
     span.style.display = 'block';
   }
});

const rt = document.querySelector('#return');

rt.addEventListener('click', () => window.location = '../index.html');