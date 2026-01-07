// 1. 최신 방식(ESM)을 지원하는 주소로 변경했습니다!
import { createClient } from 'https://esm.sh/contentful'

// 2. 내 창고 열쇠 세팅
const client = createClient({
  space: 'kt9ca8nanx3n',
  accessToken: 'waZ6thvp8c9doWZH9IpH8BQ49MhR9bA0qz1IDSQIHNM'
})

// 3. 데이터를 가져와서 화면에 뿌려주는 함수
async function displayProjects() {
  console.log("함수 시작됨!"); 
  try {
    const response = await client.getEntries({
      content_type: 'work', 
      order: '-sys.createdAt'
    })

    const container = document.getElementById('projects-container')
    console.log('가져온 데이터:', response.items);

    if (response.items.length === 0) {
      container.innerHTML = '<p style="color:white;">등록된 프로젝트가 없습니다.</p>'
      return
    }

    // 4. 화면에 그리기 (링크 기능 추가됨)
    container.innerHTML = response.items.map(item => {
      const { title, thumbnail } = item.fields
      const id = item.sys.id // ★ 핵심: 각 프로젝트의 고유 ID를 가져옵니다
      
      const imageUrl = thumbnail.fields.file.url.startsWith('//') 
                       ? 'https:' + thumbnail.fields.file.url 
                       : thumbnail.fields.file.url;

      // <a> 태그로 감싸서 클릭하면 work-detail.html로 이동하게 만듭니다
      return `
        <a href="work-detail.html?id=${id}" class="project-item" style="text-decoration: none;">
          <img src="${imageUrl}?fm=webp&q=75" alt="${title}">
          <div class="project-info">
            <h3>${title}</h3>
          </div>
        </a>
      `
    }).join('')

  } catch (error) {
    console.error('에러 상세 정보:', error);
  }
}

// 5. 실행!
displayProjects()