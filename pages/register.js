import { useEffect, useState } from "react";
import styles from "styles/register/index.module.scss";
import cn from "classnames/bind";
import Form from "components/register/form";
import Verify from "components/register/verify";
import { useRouter } from "next/router";

const cx = cn.bind(styles);

export default function Register() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && router.query.verify == "") setStep(1);
  }, [router]);

  if (!router.isReady) return <></>;
  return (
    <div className={cx("register")}>
      {step === 0 ? <Form setStep={setStep} /> : <Verify />}
    </div>
  );
}
