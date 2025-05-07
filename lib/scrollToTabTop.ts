export function scrollToTabTop(
  tabTop: React.RefObject<HTMLElement | null>,
  height: number
) {
  if (!tabTop) return;
  if (tabTop.current) {
    const topOffset =
      tabTop.current.getBoundingClientRect().top + window.scrollY - height;

    //delay
    // setTimeout(() => {
    //   window.scrollTo({ top: topOffset, behavior: "smooth" });
    // }, 1000);

    window.scrollTo({ top: topOffset, behavior: "smooth" });
  }
}
