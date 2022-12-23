import React from "react";
import qs from "qs";
import { Filters } from "@/shared/hooks/useFilters";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
  const isMounted = React.useRef(false);
  const router = useRouter();
  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.price,
        branches: Array.from(filters.selectedBranches),
      };
      const query = qs.stringify(params, { arrayFormat: "comma" });
      router.push(`?${query}`, { scroll: false });
    }
    isMounted.current = true;
  }, [filters]);
};
