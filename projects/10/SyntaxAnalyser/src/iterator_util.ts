type Result<T> =
    | { value: T; done?: false; next: Promise<Result<T>> }
    | { value: T; done: true };

export class IteratorUtil {
    public static duplicate<T>(
        iterator: AsyncIterableIterator<T>,
        times: number
    ): Array<AsyncIterableIterator<T>> {
        const results: Array<Promise<Result<T>>> = [];
        let i = 0;
        function pushResult() {
            results[i] = iterator.next().then((res) => {
                i++;
                return {
                    value: res.value,
                    done: res.done,
                    next: res.done ? undefined : pushResult(),
                } as Result<T>;
            });
            return results[i];
        }
        pushResult();
        const copies: Array<AsyncIterableIterator<T>> = [];
        for (let n = 0; n < times; n++) {
            copies.push(
                (async function* () {
                    let state = await results[0];
                    while (!state.done) {
                        yield state.value;
                        state = await state.next;
                    }
                })()
            );
        }
        return copies;
    }

    public static multiplex<
        T,
        R extends Array<(item: AsyncIterableIterator<T>) => any>
    >(iterator: AsyncIterableIterator<T>, ...fns: R): Array<Promise<any>> {
        return IteratorUtil.duplicate(iterator, fns.length).map((it, i) =>
            fns[i](it)
        );
    }
}
