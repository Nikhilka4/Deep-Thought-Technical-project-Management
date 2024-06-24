const arrow = document.querySelector('.arrow')
const expanddesc = document.querySelector('.expanddesc')
const paragraph = document.querySelector('.title')
const expandcontent = document.querySelector('.expandcontent')
const collapsecontent = document.querySelector('.collapsecontent')

arrow.addEventListener('click', () => {
    if (expanddesc.style.width === '132px') {
        expanddesc.style.width = '392px'
        paragraph.style.display = 'block'
        arrow.style.transform = 'rotate(180deg)'
        expandcontent.style.display = 'none'
        collapsecontent.style.display = 'block'
    } else {
        expanddesc.style.width = '132px'
        paragraph.style.display = 'none'
        arrow.style.transform = 'rotate(0deg)'
        expandcontent.style.display = 'block'
        collapsecontent.style.display = 'none'
    }
})

const metadata = document.querySelector('.metadata')
const assetcontainer = document.querySelector('.assetcontainer')
fetch('./data.json')
.then(res => res.json())
.then(data => {
    metadata.innerHTML = `
        <h4>${data.tasks[0].task_title}</h4>
        <p>${data.tasks[0].task_description}</p>
    `;
    for (let i = 0; i < data.tasks[0].assets.length; i++) {
        const assetDiv = document.createElement('div');
        assetDiv.classList.add('asset');
        assetcontainer.appendChild(assetDiv);

        const assetTitleDiv = document.createElement('div');
        assetTitleDiv.classList.add('assettitle');
        assetDiv.appendChild(assetTitleDiv);

        const assetTitle = document.createElement('h3');
        assetTitle.textContent = data.tasks[0].assets[i].asset_title;
        assetTitleDiv.appendChild(assetTitle);

        const assetInfoIcon = document.createElement('i');
        assetInfoIcon.classList.add('fa-solid', 'fa-info');
        assetTitleDiv.appendChild(assetInfoIcon);

        const assetContentDiv = document.createElement('div');
        assetContentDiv.classList.add('assetcontent');
        assetDiv.appendChild(assetContentDiv);

        const assetDescriptionDiv = document.createElement('p');
        assetDescriptionDiv.classList.add('assertdesccontent');
        assetContentDiv.appendChild(assetDescriptionDiv);

        const assetDescriptionSpan = document.createElement('span');
        assetDescriptionSpan.classList.add('assertdesc');
        assetDescriptionSpan.textContent = 'Description:';
        assetDescriptionDiv.appendChild(assetDescriptionSpan);

        const assetDescriptionText = document.createTextNode(data.tasks[0].assets[i].asset_description);
        assetDescriptionDiv.appendChild(assetDescriptionText);

        if (data.tasks[0].assets[i].asset_content_type === 'video' && data.tasks[0].assets[i].asset_type === 'display_asset') {
            const iframe = document.createElement('iframe');
            iframe.width = '560';
            iframe.height = '315';
            iframe.src = data.tasks[0].assets[i].asset_content;
            assetContentDiv.appendChild(iframe);
        } 
        else if(data.tasks[0].assets[i].asset_content_type === 'article' && data.tasks[0].assets[i].asset_type === 'input_asset') {
            const articleInputDiv = document.createElement('div');
            articleInputDiv.classList.add('articleinput');
            assetContentDiv.appendChild(articleInputDiv);

            const articleInputTitleDiv = document.createElement('div');
            articleInputTitleDiv.classList.add('articleinputtitle');
            articleInputDiv.appendChild(articleInputTitleDiv);

            const articleInputTitleLabel = document.createElement('label');
            articleInputTitleLabel.textContent = 'Title';
            articleInputTitleDiv.appendChild(articleInputTitleLabel);

            const articleInputTitleInput = document.createElement('input');
            articleInputTitleInput.type = 'text';
            articleInputTitleDiv.appendChild(articleInputTitleInput);

            const articleInputContentDiv = document.createElement('div');
            articleInputContentDiv.classList.add('articleinputcontent');
            articleInputDiv.appendChild(articleInputContentDiv);

            const articleInputImage = document.createElement('img');
            articleInputImage.src = './assets/inputedit.png';
            articleInputContentDiv.appendChild(articleInputImage);

            const articleInputTextbox = document.createElement('textarea');
            articleInputTextbox.cols = 20;
            articleInputTextbox.rows = 10;
            articleInputContentDiv.appendChild(articleInputTextbox);
        }
        else if(data.tasks[0].assets[i].asset_content_type === 'threadbuilder' && data.tasks[0].assets[i].asset_type === 'input_asset') {
            const input1 = document.createElement('div');
            input1.classList.add('input1');

            const input1Img = document.createElement('img');
            input1Img.src = './assets/input.png';
            input1.appendChild(input1Img);

            assetContentDiv.appendChild(input1);

            const input2 = document.createElement('div');
            input2.classList.add('input2');

            const subThreadPlusButton = document.createElement('button');
            subThreadPlusButton.innerHTML += '<i class="fa-solid fa-plus"></i> Sub-thread';
            input2.appendChild(subThreadPlusButton);

            const input2mid = document.createElement('div');
            input2mid.classList.add('input2mid');
            input2.appendChild(input2mid);

            const summaryLabel = document.createElement('label');
            summaryLabel.textContent = 'Summary for Thread A';
            input2mid.appendChild(summaryLabel);

            const summaryTextarea = document.createElement('textarea');
            summaryTextarea.placeholder = 'Enter Text Here';
            input2mid.appendChild(summaryTextarea);

            assetContentDiv.appendChild(input2);
            
        }
        else{
            const lastAssetDiv = document.createElement('div');
            lastAssetDiv.classList.add('lastasset');

            const lastAssetImg = document.createElement('img');
            lastAssetImg.src = './assets/asset4.png';
            lastAssetDiv.appendChild(lastAssetImg);

            assetContentDiv.appendChild(lastAssetDiv);
        }
            
    }
})
