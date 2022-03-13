const configureRow = (row, id) => {
    termsDiv.appendChild(row);
    row.id = id;
};

const configureOption = (select, value, selected) => {
    const option = document.createElement('option');
    option.value = value;
    option.innerText = value;
    option.selected = selected === value;
    select.appendChild(option)
};

const configureColumn = (type, content, className, parent) => {
    const element = document.createElement(type);
    element.innerText = content;
    element.classList.add(className);
    parent.appendChild(element);
};

const configureInput = (content, className, parent, api) => {
    const element = document.createElement('input');
    element.value = content;
    element.classList.add(className);
    element.addEventListener('change', (event) => api.func(event, api.term));
    parent.appendChild(element);
};

const configureRemove = (parent, params, removeFunc) => {
    const remove = document.createElement('button');
    remove.innerText = 'remove';
    remove.addEventListener("click", function (event) {
        removeFunc(params._id);
    });
    parent.appendChild(remove);
};

const configureBlock = (className, parent) => {
    const div = document.createElement('div');
    div.className = className;
    parent.appendChild(div);
    return div;
};

const updateRow = (row) => {
    editTerm(row).then(json => console.log(json));
};
