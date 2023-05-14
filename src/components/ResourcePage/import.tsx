import {Button, Form, notification, Select, Upload} from 'antd';
import React, {useMemo} from "react";
import {UploadOutlined} from '@ant-design/icons';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getCategories} from "../../services/category";
import {importExcel} from "../../services/resource";

const {Option} = Select;

interface FormValues {
    option1: string;
    option2: string;
}


const ImportForm = ({onFinish}: any) => {
    const [form] = Form.useForm()
    const queryClient = useQueryClient()
    const {data: categoryResponse} = useQuery({
        queryFn: getCategories,
        queryKey: ['categories']
    });

    const {mutate: importExcelMutate} = useMutation({
        mutationFn: importExcel,
        mutationKey: ['importExcel'],
        onSuccess: () => {
            notification.success({
                message: 'Import thành công'
            })
            onFinish()
        }
    })

    const handleSubmit = (values: any) => {
        console.log(values)
        importExcelMutate({
            ...values,
            file: values?.file?.file,
        })
    };

    const categoryOptions = useMemo(() => {
        return (categoryResponse?.data || []).map((cat: any) => ({
            label: cat.name,
            value: cat._id
        }))
    }, [categoryResponse])
    return (
        <Form onFinish={handleSubmit} form={form} layout="vertical" className="mt-4">
            <Form.Item name="file" label="Upload excel" rules={[{required: true}]}>
                <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item name="categoryIds" label="Categories" rules={[{required: true}]}>
                <Select options={categoryOptions} allowClear mode="tags">

                </Select>
            </Form.Item>

            <Form.Item name="device" label="Device" rules={[{required: true}]}>
                <Select>
                    <Option value="mobile">Mobile</Option>
                    <Option value="desktop">Desktop</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Import
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ImportForm
