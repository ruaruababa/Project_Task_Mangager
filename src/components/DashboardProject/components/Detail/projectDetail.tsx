import { convertDate } from "../../../../utils/format";
import UserAvatar from "../Item/avatar";

interface Props {
    detailProject?: any;
}

const ProjectDetail = (props: Props) => {
    const {detailProject} = props;
    return (
        <div className="text-lg bg-white rounded-xl">
            <div className="flex flex-col gap-10 p-10">
                <div className="text-xl font-semibold">
                    {detailProject?.name} -{' '}
                    <span
                        style={{
                            color: detailProject?.status?.color,
                        }}
                    >
                        {detailProject?.status?.name}
                    </span>
                </div>
                <div className="grid grid-cols-12 gap-3 text-lg">
                    <div
                        className="flex flex-col col-span-2 py-3 text-center"
                        style={{
                            border: '1px dashed  #cccccc',
                        }}
                    >
                        <div className="text-lg font-semibold">
                            {convertDate(detailProject?.starts_at)}
                        </div>

                        <div className="text-gray-400">Ngày bắt đầu</div>
                    </div>
                    <div
                        className="flex flex-col col-span-2 py-3 text-center"
                        style={{
                            border: '1px dashed  #cccccc',
                        }}
                    >
                        <div className="text-lg font-semibold">
                            {convertDate(detailProject?.ends_at)}
                        </div>
                        <div className="text-gray-400">Ngày hoàn thành</div>
                    </div>
                    <div
                        className="flex flex-col col-span-2 py-3 text-center"
                        style={{
                            border: '1px dashed  #cccccc',
                        }}
                    >
                        <div className="text-lg font-semibold">
                            {detailProject?.progress || 0} %
                        </div>
                        <div className="text-gray-400">
                            Phần trăm hoàn thành
                        </div>
                    </div>
                    <div className="flex col-span-2 py-3 text-center">
                        <UserAvatar users={detailProject?.users || []} />
                    </div>
                </div>
                <div className="grid grid-cols-12">
                    <div className="col-span-2 text-lg font-semibold text-gray-400">
                        Khách hàng:
                    </div>
                    <div className="col-span-10 font-semibold">
                        {detailProject?.customer_name}
                    </div>
                </div>
                {detailProject?.status?.id === 3 && (
                    <div className="grid grid-cols-12">
                        <div className="col-span-2 text-lg font-semibold text-gray-400">
                            Lý do trì hoãn:
                        </div>
                        <div className="col-span-10 font-semibold">
                            {detailProject?.pending_reason}
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-12">
                    <div className="col-span-2 text-lg font-semibold text-gray-400">
                        Code:
                    </div>
                    <div className="col-span-10 font-semibold">
                        {detailProject?.code}
                    </div>
                </div>
                <div className="grid grid-cols-12">
                    <div className="col-span-2 text-lg font-semibold text-gray-400">
                        Duration:
                    </div>
                    <div className="col-span-10 font-semibold">
                        {detailProject?.duration}
                    </div>
                </div>
                <div className="grid grid-cols-12">
                    <div className="col-span-2 text-lg font-semibold text-gray-400">
                        Summary:
                    </div>
                    <div className="col-span-10 font-semibold">
                        {detailProject?.summary || 'Không xác định'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
