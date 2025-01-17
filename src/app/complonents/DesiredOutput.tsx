import { Input } from '@headlessui/react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { changeCount, changeStuff } from '@/lib/features/desiredStuffSlice';
import { stuffList } from '@/lib/models';

export function DesiredOutput() {
    const desiredCount = useAppSelector((state) => state.desiredStuff.count);
    const dispatch = useAppDispatch();

    return (<div className="p-2 m-6 bg-neutral-400">
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th>Count</th>
                    <th>Disered stuff</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <Input type='text' value={desiredCount} onChange={e => dispatch(changeCount(e.target.value))}
                            className="mt-3 block w-16 rounded-lg border-none bg-white py-1.5 px-3 text-sm/6 text-whit size-8 m-auto"></Input>
                    </td>
                    <td>
                        <Input list='dataList' type='text' onChange={e => dispatch(changeStuff(e.target.value))}
                            className="mt-3 block w-full rounded-lg border-none bg-white py-1.5 px-3 text-sm/6 text-whit size-8"></Input>

                        <datalist id='dataList'>
                            {stuffList.map(e => <option value={e.name} key={e.name} />)}
                        </datalist>
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>);
}