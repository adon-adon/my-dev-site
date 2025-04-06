'use client'
import { useActionState, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Image from 'next/image'

import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
} from '@/components/ui/Form'
import { Modal, ModalContent, ModalBody, useDisclosure } from '@heroui/react'

import requiredCheckImg from '@/assets/images/register/requiredCheck.png'
import checkSuccess from '@/assets/images/common/check-success.png'

import { cn } from '@/lib/utils'
import { z } from 'zod'
import { apiPost } from '@/utils/axiosInstance'

import { check } from '@/utils/validator'

import styles from './issueForm.module.scss'

// 定义表单校验规则
const schema = z.object({
  username: z
    .string()
    .min(1, { message: 'Tên đăng nhập không được để trống' })
    .min(4, { message: 'Tên hợp lệ phải gồm 4-20 ký tự' })
    .max(20, { message: 'Tên hợp lệ phải gồm 4-20 ký tự' }),
  phone: z
    .string()
    .min(10, { message: 'Số điện thoại phải đúng định dạng 10 số' })
    .max(10, { message: 'Số điện thoại phải đúng định dạng 10 số' })
    .regex(check.phoneNumber, {
      message: 'Số điện thoại không đúng định dạng',
    }),
  email: z.string().regex(check.validateEmail, {
    message: 'Vui lòng nhập đúng định dạng @gmail.com',
  }),
  description: z
    .string()
    .min(5, { message: 'Độ dài nội dung dài 5-800 ký tự' })
    .max(800, { message: 'Độ dài nội dung dài 5-800 ký tự' }),
})

type IssueFormData = {
  username: string
  phone: string
  email: string
  description: string
}

type IssueActionResponse = {
  success: boolean
  message?: string
  errors?: Partial<FormData>
}

const initialState: IssueActionResponse = {
  success: false,
  message: '',
  errors: undefined,
}

export default function IssueForm() {
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const [formData, setFormData] = useState<IssueFormData>({
    username: '',
    phone: '',
    email: '',
    description: '',
  })

  const [errors, setErrors] = useState<Partial<IssueFormData>>({})

  const [state, formAction, isPending] = useActionState<
    IssueActionResponse,
    FormData
  >(async (prevState: IssueActionResponse, formData: FormData) => {
    const data = {
      type: 2,
      userName: formData.get('username') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      message: formData.get('description') as string,
    }

    const response = await apiPost(
      `/member/member/feedback`,
      data
    )

    if (response.code === 0) {
      onOpen()
      setTimeout(() => {
        onClose()
      }, 5000)
    }

    return {
      success: true,
      message: 'success',
    }
  }, initialState)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    console.log(`name ${name}`, `value ${value}`)

    setFormData((prev) => ({ ...prev, [name]: value }))

    // 实时校验, 仅校验当前输入的字段
    const fieldSchema = schema.shape[name as keyof IssueFormData]
    const result = fieldSchema.safeParse(value)

    setErrors((prev) => ({
      ...prev,
      [name]: result.success ? undefined : result.error.format()?._errors[0],
    }))
  }

  const canClick = useMemo(() => {
    // 并且校验所有字段都已经输入
    const isAllInput =
      formData.username &&
      formData.phone &&
      formData.email &&
      formData.description

    const isAllValid = Object.keys(errors).every((key) => !errors[key])

    if (isAllInput && isAllValid) {
      return true
    }

    return false
  }, [formData, errors])

  return (
    <>
      <Form action={formAction}>
        <FormGroup className={styles.formGroup}>
          <div className="flex flex-row items-center">
            <FormLabel htmlFor="username">
              <div className={styles.labelBox}>
                Họ tên của bạn
                <Image
                  className={styles.requiredCheck}
                  src={requiredCheckImg}
                  alt=""
                />
              </div>
            </FormLabel>
            <FormInput
              id="username"
              name="username"
              placeholder="Nhập họ và tên của bạn"
              onChange={handleChange}
              aria-describedby="username-error"
              className={styles.inputBox}
            />
          </div>

          {errors?.username && (
            <p id="title-error" className={styles.errorTip}>
              {errors.username}
            </p>
          )}
        </FormGroup>

        <FormGroup className={styles.formGroup}>
          <div className="flex flex-row items-center">
            <FormLabel htmlFor="phone">
              <div className={styles.labelBox}>Số điện thoại</div>
            </FormLabel>
            <FormInput
              id="phone"
              name="phone"
              maxLength={10}
              placeholder="Nhập số điện thoại của bạn"
              onChange={handleChange}
              aria-describedby="phone-error"
              className={styles.inputBox}
            />
          </div>

          {errors?.phone && (
            <p id="title-error" className={styles.errorTip}>
              {errors.phone}
            </p>
          )}
        </FormGroup>

        <FormGroup className={styles.formGroup}>
          <div className="flex flex-row items-center">
            <FormLabel htmlFor="email">
              <div className={styles.labelBox}>
                Địa chỉ Email
                <Image
                  className={styles.requiredCheck}
                  src={requiredCheckImg}
                  alt=""
                />
              </div>
            </FormLabel>
            <FormInput
              id="email"
              name="email"
              type="email"
              placeholder="Nhập email của bạn"
              onChange={handleChange}
              aria-describedby="email-error"
              className={styles.inputBox}
            />
          </div>

          {errors?.email && (
            <p id="title-error" className={styles.errorTip}>
              {errors.email}
            </p>
          )}
        </FormGroup>

        <FormGroup className={styles.formGroup}>
          <div className="flex flex-row items-start">
            <FormLabel htmlFor="description">
              <div className={cn('mt-1', styles.labelBox)}>Nội dung</div>
            </FormLabel>
            <FormTextarea
              id="description"
              name="description"
              placeholder="Nhập nội dung"
              onChange={handleChange}
              rows={4}
              maxLength={800}
              aria-describedby="description-error"
              className={styles.textareaBox}
            />
          </div>

          {errors?.description && (
            <p id="description-error" className={styles.errorTip}>
              {errors.description}
            </p>
          )}
        </FormGroup>

        <Button
          type="submit"
          isLoading={isPending}
          className={canClick ? styles.button : styles.buttonDisabled}
        >
          XÁC NHẬN
        </Button>
      </Form>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton={true}
        className={styles.modal}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className={styles.modalBody}>
                <div className={styles.tipWrap}>
                  <Image src={checkSuccess} alt="" className={styles.tipImg} />
                  <p className={styles.modelTipTitle}>Gửi đơn thành công</p>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
