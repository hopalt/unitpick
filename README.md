# unitpick.hopalt.com

유닛픽(UnitPick) 소개 페이지와 개인정보 처리방침. GitHub Pages 로 배포한다.

앱 소스는 별도 저장소에 있다 — `gitlab.hopalt.com/hopalt/unit-pick`

## 구조

```
index.html          소개 페이지
privacy/index.html  개인정보 처리방침 (플레이 콘솔에 넣는 URL)
translations.js     ★ 모든 문구는 여기 있다 (ko / en)
app.js              언어 전환, 스크린샷 교체, 처리방침 본문 렌더
styles.css
assets/             앱 아이콘, 기기 스크린샷 (언어별)
og.png              공유 카드 1200×630
CNAME               unitpick.hopalt.com
```

## 문구 고치기

`translations.js` 만 고치면 된다. HTML 은 `data-i18n="키"` 로 자리만 잡아 둔다.

`ko` 와 `en` 의 키가 어긋나면 그 자리가 **빈 칸으로 조용히 렌더링**되므로,
키를 추가할 때는 반드시 두 언어에 같이 넣는다.

## 언어

`?lang=ko` / `?lang=en` → `localStorage` → 브라우저 언어 → `en` 순으로 정해진다.
페이지를 오갈 때 선택한 언어가 유지된다.

## 스토어 링크

히어로 버튼이 플레이스토어 등록 페이지(`com.hopalt.unitconv`)로 연결된다.
`index.html` 의 `<a class="store-badge">` 가 그것이고, 문구는 `translations.js`
의 `storeBadge` 키다.

## 배포

`main` 에 푸시하면 GitHub Pages 가 그대로 서빙한다. 빌드 단계가 없다.

처음 설정할 때 필요한 것:

1. GitHub 저장소 Settings → Pages → Source 를 `main` / `/ (root)` 로
2. DNS 에 `unitpick` → `hopalt.github.io` CNAME 레코드 추가
3. Pages 설정에서 Custom domain 이 `unitpick.hopalt.com` 으로 잡히고
   Enforce HTTPS 가 켜지는지 확인

## 로컬 확인

```bash
python3 -m http.server 8765
open http://localhost:8765/?lang=ko
```
