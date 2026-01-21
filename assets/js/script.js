// 1. 최신 방식(ESM)을 지원하는 주소로 변경했습니다!
import { createClient } from 'https://esm.sh/contentful'

// 2. 내 창고 열쇠 세팅
const client = createClient({
  space: 'a2i4hu9d1yta',
  accessToken: 'tOOpIzbWM3kluA5V6w1pRQm37-68MKjLWqis_3bszXA'
})

// 3. 데이터를 가져와서 화면에 뿌려주는 함수
async function displayProjects() {
  console.log("함수 시작됨!"); 
  try {
    const response = await client.getEntries({
      content_type: 'baebsae-detail', // 1. 모델 ID (22.PNG 상단 확인)
      order: '-sys.createdAt'
    })

    const container = document.getElementById('projects-container')
    
    if (response.items.length === 0) {
      container.innerHTML = '<p style="color:white;">등록된 프로젝트가 없습니다.</p>'
      return
    }

    // 4. 화면에 그리기
    container.innerHTML = response.items.map(item => {
      // 2. 필드 ID 매칭 (위에서 고친 name과 thumbnail 사용)
      const title = item.fields.name || '제목 없음'
      const thumbnail = item.fields.thumbnail 
      const id = item.sys.id

      // 이미지 주소 처리 안전장치
      const imageUrl = (thumbnail && thumbnail.fields && thumbnail.fields.file) 
        ? (thumbnail.fields.file.url.startsWith('//') ? 'https:' + thumbnail.fields.file.url : thumbnail.fields.file.url)
        : 'https://via.placeholder.com/600x400?text=No+Image'; 

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


// Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
              });
            }
        });
  });