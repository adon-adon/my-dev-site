/* eslint-disable @next/next/no-img-element */
'use client'
import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ButtonCus from '@/components/ui/Button'
import Image from 'next/image'

import { Form, FormGroup, FormLabel, FormInput } from '@/components/ui/Form'
import { Modal, ModalContent, ModalBody, useDisclosure } from '@heroui/react'

import { Checkbox } from '@mui/material'
import { z } from 'zod'
import { check } from '@/utils/validator'
import { apiGet, apiPost } from '@/utils/axiosInstance'

import usernameImg from '@/assets/images/register/username.png'
import passwordImg from '@/assets/images/register/password.png'
import phoneImg from '@/assets/images/register/phone.png'
import verifyCodeImg from '@/assets/images/register/verifyCode.png'
import emailImg from '@/assets/images/register/email.png'
import linkImg from '@/assets/images/register/link.png'
import telegramImg from '@/assets/images/register/telegram.png'
import requiredCheckImg from '@/assets/images/register/requiredCheck.png'
import errTip from '@/assets/svg/errTip.svg'
import clossImg from '@/assets/images/common/icon-close.png'
import checkSuccess from '@/assets/images/common/check-success.png'
import eyeCloseImg from '@/assets/images/register/eye-close.png'
import eyeOpenImg from '@/assets/images/register/eye-open.png'

import styles from './registerForm.module.scss'

// 定义表单校验规则
const baseSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Tên đăng nhập không được để trống' })
    .min(4, { message: '4 - 20 ký tự bao gồm chữ và số' })
    .max(20, { message: '4 - 20 ký tự bao gồm chữ và số' }),
  password: z
    .string()
    .min(6, { message: '6 - 15 ký tự bao gồm chữ và số' })
    .max(15, { message: '6 - 15 ký tự bao gồm chữ và số' }),
  confirmPassword: z
    .string()
    .min(6, { message: '6 - 15 ký tự bao gồm chữ và số' })
    .max(15, { message: '6 - 15 ký tự bao gồm chữ và số' }),
  phone: z
    .string()
    .min(10, { message: 'Số điện thoại phải đúng định dạng 10 số' })
    .max(10, { message: 'Số điện thoại phải đúng định dạng 10 số' })
    .regex(check.phoneNumber, {
      message: 'Số điện thoại không đúng định dạng',
    }),
  verifyCode: z
    .string()
    .min(4, { message: 'Mã xác minh không được để trống' })
    .max(4, { message: 'Mã xác minh không được để trống' }),
  email: z.string().regex(check.validateEmail, {
    message: 'Vui lòng nhập đúng định dạng @gmail.com',
  }),
  link: z.string().optional(),
  telegram: z.string().optional(),
})

const schema = baseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Xác nhận mật khẩu không trùng khớp',
    path: ['confirmPassword'],
  }
)

type UserFormData = {
  username: string
  password: string
  confirmPassword: string
  phone: string
  verifyCode: string
  email: string
  link: string
  telegram: string
}

type UserActionResponse = {
  success: boolean
  message?: string
  errors?: Partial<FormData>
}

const initialState: UserActionResponse = {
  success: false,
  message: '',
  errors: undefined,
}

export default function RegisterForm() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const router = useRouter()

  const [captcha, setCaptcha] = useState<string>('')

  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    verifyCode: '',
    email: '',
    link: '',
    telegram: '',
  })

  const [errors, setErrors] = useState<Partial<UserFormData>>({})
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false)
  const [errMsg, setErrMsg] = useState<string>('')

  const [state, formAction, isPending] = useActionState<
    UserActionResponse,
    FormData
  >(async (prevState: UserActionResponse, formDataTemp: FormData) => {
    // get data from form
    const data = {
      username: formDataTemp.get('username'),
      password: formDataTemp.get('password'),
      confirmPassword: formDataTemp.get('confirmPassword'),
      phone: formDataTemp.get('phone'),
      verifyCode: formDataTemp.get('verifyCode'),
      email: formDataTemp.get('email'),
      link: formDataTemp.get('link'),
      telegram: formDataTemp.get('telegram'),
    }

    // verify data
    const result = schema.safeParse(data)

    if (!result.success) {
      const fieldErrors = result.error.format()
      setErrors({
        username: fieldErrors.username?._errors[0],
        password: fieldErrors.password?._errors[0],
        confirmPassword: fieldErrors.confirmPassword?._errors[0],
        phone: fieldErrors.phone?._errors[0],
        verifyCode: fieldErrors.verifyCode?._errors[0],
        email: fieldErrors.email?._errors[0],
      })
      return {
        success: false,
        message: 'Account creation failed',
      }
    }

    // send data to server
    const response = await apiPost<string>('/member/system/applyAgent', {
      userName: data.username,
      password: data.password,
      phone: data.phone,
      verificationCode: data.verifyCode,
      email: data.email,
      link: data.link,
      telegram: data.telegram,
    })

    if (response.code === 0) {
      setIsRegisterSuccess(true)
    } else {
      setErrMsg(response.msg)
      setIsRegisterSuccess(false)
      setFormData({
        ...formData,
        verifyCode: '',
      })
    }

    onOpen()
    setTimeout(() => {
      onClose()
    }, 5000)
    // refresh the code
    getCaptchaImage()
    return {
      success: false,
      message: 'Account created',
    }
  }, initialState)

  useEffect(() => {
    getCaptchaImage()
  }, [])

  const getCaptchaImage = async () => {
    const response = await apiGet<string>('/member/system/getCaptchaImage')
    if (response.code === 0) {
      setCaptcha(response.data)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(`name ${name}`, `value ${value}`)

    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'confirmPassword') {
      const result = schema.safeParse({ ...formData, confirmPassword: value })
      console.log('result', result)
      setErrors((prev) => ({
        ...prev,
        confirmPassword: result.success
          ? undefined
          : result.error.format().confirmPassword?._errors[0],
      }))
    } else {
      // 实时校验, 仅校验当前输入的字段
      const fieldSchema = baseSchema.shape[name as keyof UserFormData]
      const result = fieldSchema.safeParse(value)

      setErrors((prev) => ({
        ...prev,
        [name]: result.success ? undefined : result.error.format()?._errors[0],
      }))
    }
  }

  return (
    <>
      <Form action={formAction}>
        <FormGroup className={styles.formGroup}>
          <div className="flex flex-row items-center">
            <FormLabel htmlFor="username">
              <div className={styles.labelBox}>
                <Image className={styles.iconImg} src={usernameImg} alt="" />
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
              maxLength={20}
              value={formData.username}
              placeholder="Nhập tên đăng nhập"
              aria-describedby="username-error"
              onChange={handleChange}
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
            <FormLabel htmlFor="password">
              <div className={styles.labelBox}>
                <Image className={styles.iconImg} src={passwordImg} alt="" />
                <Image
                  className={styles.requiredCheck}
                  src={requiredCheckImg}
                  alt=""
                />
              </div>
            </FormLabel>
            <div className={styles.passwordBox}>
              <FormInput
                id="password"
                name="password"
                maxLength={15}
                value={formData.password}
                placeholder="Nhập mật khẩu"
                onChange={handleChange}
                disabled={isPending}
                aria-describedby="password-error"
                className={styles.inputBox}
                type={showPassword ? 'text' : 'password'}
              />

              <Image
                onClick={() => {
                  setShowPassword((prevVal) => !prevVal)
                }}
                src={showPassword ? eyeOpenImg : eyeCloseImg}
                className={styles.passwordIcon}
                alt=""
              />
            </div>
          </div>

          {errors?.password && (
            <p id="title-error" className={styles.errorTip}>
              {errors.password}
            </p>
          )}
        </FormGroup>

        <FormGroup className={styles.formGroup}>
          <div className="flex flex-row items-center">
            <FormLabel htmlFor="confirmPassword">
              <div className={styles.labelBox}>
                <Image className={styles.iconImg} src={passwordImg} alt="" />
                <Image
                  className={styles.requiredCheck}
                  src={requiredCheckImg}
                  alt=""
                />
              </div>
            </FormLabel>
            <div className={styles.passwordBox}>
              <FormInput
                id="confirmPassword"
                name="confirmPassword"
                maxLength={15}
                value={formData.confirmPassword}
                placeholder="Nhập lại mật khẩu"
                onChange={handleChange}
                aria-describedby="confirmPassword-error"
                className={styles.inputBox}
                type={showConfirmPassword ? 'text' : 'password'}
              />
              <Image
                onClick={() => {
                  setShowConfirmPassword((prevVal) => !prevVal)
                }}
                src={showConfirmPassword ? eyeOpenImg : eyeCloseImg}
                className={styles.passwordIcon}
                alt=""
              />
            </div>
          </div>

          {errors?.confirmPassword && (
            <p id="title-error" className={styles.errorTip}>
              {errors.confirmPassword}
            </p>
          )}
        </FormGroup>

        <FormGroup className={styles.formGroup}>
          <div className="flex flex-row items-center">
            <FormLabel htmlFor="phone">
              <div className={styles.labelBox}>
                <Image className={styles.iconImg} src={phoneImg} alt="" />
                <Image
                  className={styles.requiredCheck}
                  src={requiredCheckImg}
                  alt=""
                />
              </div>
            </FormLabel>
            <FormInput
              id="phone"
              name="phone"
              value={formData.phone}
              maxLength={10}
              placeholder="Nhập số điện thoại"
              onChange={handleChange}
              aria-describedby="username-error"
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
            <FormLabel htmlFor="verifyCode">
              <div className={styles.labelBox}>
                <Image className={styles.iconImg} src={verifyCodeImg} alt="" />
                <Image
                  className={styles.requiredCheck}
                  src={requiredCheckImg}
                  alt=""
                />
              </div>
            </FormLabel>
            <div className={styles.verifyCodeBox}>
              <FormInput
                id="verifyCode"
                name="verifyCode"
                value={formData.verifyCode}
                maxLength={4}
                placeholder="Nhập mã xác minh"
                onChange={handleChange}
                aria-describedby="verifyCode-error"
                className={styles.inputBox}
              />
              {captcha && (
                <img
                  onClick={getCaptchaImage}
                  src={captcha}
                  className={styles.captcha}
                  alt=""
                />
              )}
            </div>
          </div>

          {errors?.verifyCode && (
            <p id="title-error" className={styles.errorTip}>
              {errors.verifyCode}
            </p>
          )}
        </FormGroup>

        <FormGroup className={styles.formGroup}>
          <div className="flex flex-row items-center">
            <FormLabel htmlFor="email">
              <div className={styles.labelBox}>
                <Image className={styles.iconImg} src={emailImg} alt="" />
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
              value={formData.email}
              placeholder="Nhập chính xác email"
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
          <div className="flex flex-row items-center">
            <FormLabel htmlFor="link">
              <div className={styles.labelBox}>
                <Image className={styles.iconImg} src={linkImg} alt="" />
                <div className={styles.requiredCheck}></div>
              </div>
            </FormLabel>
            <FormInput
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="Nhập URL trang web của bạn"
              aria-describedby="username-error"
              className={styles.inputBox}
            />
          </div>

          {errors?.link && (
            <p id="title-error" className={styles.errorTip}>
              {errors.link}
            </p>
          )}
        </FormGroup>

        <FormGroup className={styles.formGroup}>
          <div className="flex flex-row items-center">
            <FormLabel htmlFor="telegram">
              <div className={styles.labelBox}>
                <Image className={styles.iconImg} src={telegramImg} alt="" />
                <div className={styles.requiredCheck}></div>
              </div>
            </FormLabel>
            <FormInput
              id="telegram"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              placeholder="Telegram của bạn"
              aria-describedby="telegram-error"
              className={styles.inputBox}
            />
          </div>

          {errors?.telegram && (
            <p id="title-error" className={styles.errorTip}>
              {errors.telegram}
            </p>
          )}
        </FormGroup>

        <FormGroup className={styles.formGroup}>
          <div className="flex flex-row items-center">
            <FormLabel htmlFor="username">
              <div className={styles.labelBox}></div>
            </FormLabel>
            <div>
              <div className={styles.tips}>
                <Image
                  className={styles.requiredCheck}
                  src={requiredCheckImg}
                  alt=""
                />
                <div>Thông tin bắt buộc nhập đầy đủ</div>
              </div>
              <div className={styles.tips}>
                <Checkbox className={styles.checkbox} defaultChecked />
                <div>
                  Tôi đã đủ 18 tuổi trở lên, đồng ý tất cả
                  <br />
                  <span
                    className={styles.blueTip}
                    onClick={() => router.push('/terms')}
                  >
                    Điều kiện & điều khoản
                  </span>
                  &nbsp; của 2Q
                </div>
              </div>
            </div>
          </div>
        </FormGroup>

        <ButtonCus
          type="submit"
          isLoading={isPending}
          className={styles.button}
        >
          ĐĂNG KÝ
        </ButtonCus>
      </Form>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton={true}
        className={styles.modal}
        style={{
          ['--width1' as any]: isRegisterSuccess ? '406px' : '359px',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody
                className={styles.modalBody}
                style={{
                  ['--width2' as any]: isRegisterSuccess ? '390px' : '343px',
                }}
              >
                {isRegisterSuccess && (
                  <Image
                    src={clossImg}
                    alt=""
                    className={styles.closeIcon}
                    onClick={onClose}
                  />
                )}

                <div className={styles.tipWrap}>
                  {isRegisterSuccess ? (
                    <>
                      <Image
                        src={checkSuccess}
                        alt=""
                        className={styles.tipImg}
                      />
                      <p className={styles.modelTipTitle1}>
                        ĐĂNG KÝ THÀNH CÔNG
                      </p>
                      <p className={styles.modelTipTitle2}>
                        Đơn đăng ký của bạn sẽ được xét duyệt trong vòng 24 giờ.
                        Mọi thắc mắc xin liên hệ chuyên viên CSKH Đại lý!
                      </p>
                    </>
                  ) : (
                    <>
                      <Image src={errTip} alt="" className={styles.errTip} />
                      <p className={styles.modelTipTitle2}>{errMsg}</p>
                    </>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
