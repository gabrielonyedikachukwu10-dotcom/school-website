export default function StoryBookAnimation() {
  return (
    <div className="flex justify-center [perspective:900px]" aria-label="Rotating storybook animation">
      <div className="storybook">
        <div className="storybook__cover flex items-center justify-center p-5 text-center">
          <div>
            <p className="font-heading text-xl font-bold text-white sm:text-3xl">Knowledge</p>
            <p className="mt-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-blue sm:text-sm">is Power</p>
          </div>
        </div>
        <div className="storybook__back" />
        <div className="storybook__pages" />
      </div>
    </div>
  );
}
