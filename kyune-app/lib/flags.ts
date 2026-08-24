/**
 * 건강기능식품(영양제) 관련 상품과 구독 서비스의 노출 여부.
 *
 * 카드사 심사 중에는 false로 둔다. 영양제·알약 관련 상품, 영양제 구독
 * 서비스, 그리고 이를 전제로 한 약관 조항이 사이트 전체에서 숨겨지고
 * 순수 오브제만 노출된다.
 *
 * 건강기능식품판매업 신고증이 발급되면 이 값을 true로 되돌리는 것만으로
 * 상품·구독·약관 조항이 한 번에 복구된다. 데이터는 지우지 않고 그대로 둔다.
 *
 * 관련: lib/products.ts (supplement 플래그가 붙은 상품), app/subscribe,
 * components/SubscribeCta·SuccessUpsell, app/terms·refund·privacy
 */
export const SUPPLEMENTS_ENABLED = true;
