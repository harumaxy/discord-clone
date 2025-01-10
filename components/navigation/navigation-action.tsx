import { Plus } from "lucide-react";
import ActionTooltip from "../action-tooltip";

// taiwindcss
// group : 子要素にある要素すべてをグループにする (親が hover, focus などされた場合に子要素すべてを反応させるために使う)
// group-*:(classes) : グループが * されたときに適用されるクラス

const NavigationAction = () => {
  return (
    <div>
      {/* ActionTooltip の children が、Tooltip 表示トリガーになる */}
      <ActionTooltip side="right" align="center" label="Add a server">
        <button className="group flex items-center">
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus className="group-hover:text-white transition text-emerald-500" />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
