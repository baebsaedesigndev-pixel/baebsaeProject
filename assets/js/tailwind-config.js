tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
          // 'sans'를 기본으로 설정하면 모든 글자가 프리텐다드로 변해!
          'sans': ['Pretendard', 'Noto Sans KR', 'sans-serif'],
          'paperozi': ['Paperozi', 'Noto Sans KR', 'sans-serif'],
          'space': ['Space Mono', 'Noto Sans KR', 'monospace']
        },
      screens: {
        '3xl': '2561px', // 쉼표와 따옴표 위치 확인!
      }
    }
  }
}