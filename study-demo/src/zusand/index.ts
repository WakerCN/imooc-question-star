/*
 * @Author       : 魏威
 * @Date         : 2024-03-20 16:28
 * @LastEditTime : 2024-03-22 10:27
 * @LastEditors  : Waker
 * @Description  :
 */
import { MockData } from '@/dnd/data';
import { arrayMove } from '@dnd-kit/sortable';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import { StoreApi, UseBoundStore, create } from 'zustand';

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store.use as any)[k] = () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      store((s: { [x: string]: any }) => s[k as keyof typeof s]);
  }

  return store;
};

interface WidgetState {
  list: Array<{ id: string; type: string }>;
}

interface Action {
  move: (oldIndex: number, newIndex: number) => void;
  add: (id: string, type: string) => void;
}

const useZusandStorebase = create<WidgetState & Action>()((set) => ({
  list: MockData.widgetList,
  move: (oldIndex: number, newIndex: number) =>
    set(
      produce((state: WidgetState) => {
        state.list = arrayMove(state.list, oldIndex, newIndex);
      })
    ),
  add: (id: string, type: string) =>
    set(
      produce((state: WidgetState) => {
        const index = state.list.findIndex((item) => item.id === id);
        state.list.splice(index + 1, 0, { id: nanoid(8), type });
      })
    ),
}));

export const useWidgetStore = createSelectors(useZusandStorebase);
