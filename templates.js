export const listItemTemplate = data => 
`   <li class="list-item" data-id="${data.number}">
        <span class="list-meta-info">
            <img src="${data.imageUrl}" class="item-avatar-img" alt="${data.name}">
            <span class="number">${String(data.number).padStart(3, '0')}</span>
        </span>
        <span class="list-info">
            <span class="name">${data.name}</span>
        </span>
    </li>`;

export const typeTemplate = name => `<span class="type">${name}</span>`
