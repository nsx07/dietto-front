"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { FeatureCard } from "./feature-card";
import { TestimonialCard } from "./testimonial-card";
import { PricingCard } from "./pricing-card";
import { FaqAccordion } from "./faq-accordion";

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 px-4 py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute -top-[40%] -right-[30%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute -bottom-[20%] -left-[30%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]" />
      </div>
      <div ref={ref} className="container relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                staggerChildren: 0.2,
              },
            },
          }}
          className="flex flex-col items-center justify-center space-y-8 text-center"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="space-y-4"
          >
            <div className="inline-block rounded-full bg-muted px-4 py-1.5 text-sm font-medium">Introducing Our New Web Application</div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">Transform Your Digital Experience</h1>
            <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl">Discover a new way to manage your digital workflow with our intuitive, powerful, and beautiful web application.</p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.6 } },
            }}
            className="relative mt-8 w-full max-w-5xl overflow-hidden rounded-xl border bg-background/80 shadow-xl backdrop-blur-sm"
          >
            <div className="aspect-[16/9] w-full">
              <Image src="/placeholder.svg?height=1080&width=1920" alt="Application dashboard preview" width={1920} height={1080} className="object-cover" priority />
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-16 flex justify-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.5 }} className="animate-bounce">
            <Link href="#features" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
              Scroll to explore
              <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const features = [
    {
      title: "Intuitive Interface",
      description: "Our clean, user-friendly interface makes navigation effortless and reduces the learning curve.",
      icon: "layout",
    },
    {
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time, making changes and seeing updates instantly.",
      icon: "users",
    },
    {
      title: "Advanced Analytics",
      description: "Gain valuable insights with comprehensive analytics and customizable reporting tools.",
      icon: "bar-chart",
    },
    {
      title: "Secure Data Storage",
      description: "Your data is protected with enterprise-grade security and regular automated backups.",
      icon: "shield",
    },
    {
      title: "Cross-platform Compatibility",
      description: "Access your work from any device with our responsive web application.",
      icon: "smartphone",
    },
    {
      title: "Automated Workflows",
      description: "Save time with customizable automation for your most common tasks and processes.",
      icon: "zap",
    },
  ];

  return (
    <section id="features" ref={ref} className="bg-background px-4 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="space-y-16"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mx-auto max-w-2xl space-y-4 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Powerful Features for Modern Teams</h2>
            <p className="text-muted-foreground md:text-lg">Our application is designed to streamline your workflow and boost productivity with these key features.</p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <FeatureCard title={feature.title} description={feature.description} icon={feature.icon} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const testimonials = [
    {
      quote: "This application has completely transformed how our team collaborates. The interface is intuitive and the features are exactly what we needed.",
      author: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote: "I've tried many similar tools, but none compare to the ease of use and powerful features this platform offers. It's become essential to our workflow.",
      author: "Michael Chen",
      role: "Lead Developer at InnovateLabs",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote: "The analytics capabilities alone are worth the investment. We've gained valuable insights that have directly impacted our business decisions.",
      author: "Emily Rodriguez",
      role: "Marketing Director at GrowthBrand",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ];

  return (
    <section ref={ref} className="bg-muted/30 px-4 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="space-y-16"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mx-auto max-w-2xl space-y-4 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Trusted by Innovative Teams</h2>
            <p className="text-muted-foreground md:text-lg">Hear what our customers have to say about their experience with our application.</p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <TestimonialCard quote={testimonial.quote} author={testimonial.author} role={testimonial.role} avatar={testimonial.avatar} />
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mx-auto flex max-w-lg flex-wrap items-center justify-center gap-8"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 w-auto opacity-70 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0">
                <Image src={`/placeholder.svg?height=48&width=120&text=Logo ${i}`} alt={`Company logo ${i}`} width={120} height={48} className="h-full w-auto object-contain" />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PricingSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small projects",
      price: "$9",
      features: ["Up to 5 projects", "Basic analytics", "24-hour support response time", "1GB storage", "Standard security"],
    },
    {
      name: "Professional",
      description: "Ideal for growing teams and businesses",
      price: "$29",
      popular: true,
      features: ["Unlimited projects", "Advanced analytics", "4-hour support response time", "10GB storage", "Enhanced security", "Team collaboration tools", "Custom workflows"],
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex needs",
      price: "$99",
      features: [
        "Everything in Professional",
        "Priority support with 1-hour response time",
        "100GB storage",
        "Enterprise-grade security",
        "Advanced permissions",
        "Custom integrations",
        "Dedicated account manager",
      ],
    },
  ];

  return (
    <section ref={ref} className="bg-background px-4 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="space-y-16"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mx-auto max-w-2xl space-y-4 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground md:text-lg">Choose the plan that&apos;s right for you and start improving your workflow today.</p>
          </motion.div>

          <Tabs defaultValue="monthly" className="mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly (Save 20%)</TabsTrigger>
            </TabsList>
            <TabsContent value="monthly" className="mt-8">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    }}
                  >
                    <PricingCard name={plan.name} description={plan.description} price={plan.price} period="/month" features={plan.features} popular={plan.popular} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="yearly" className="mt-8">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan, index) => {
                  const yearlyPrice = Number.parseInt(plan.price.replace("$", "")) * 0.8 * 12;
                  return (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                      }}
                    >
                      <PricingCard name={plan.name} description={plan.description} price={`$${yearlyPrice}`} period="/year" features={plan.features} popular={plan.popular} />
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}

function FaqSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const faqs = [
    {
      question: "How does the 14-day free trial work?",
      answer:
        "You can sign up for our 14-day free trial without providing any payment information. You'll have full access to all features during this period. At the end of the trial, you can choose to subscribe to one of our plans or your account will automatically downgrade to the free tier with limited features.",
    },
    {
      question: "Can I change my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new features will be immediately available and we'll prorate your billing. When downgrading, the changes will take effect at the start of your next billing cycle.",
    },
    {
      question: "Is there a limit to how many team members I can add?",
      answer:
        "The number of team members you can add depends on your plan. The Starter plan allows up to 5 team members, the Professional plan allows up to 20, and the Enterprise plan has unlimited team members. You can always upgrade your plan if you need to add more team members.",
    },
    {
      question: "Do you offer discounts for nonprofits or educational institutions?",
      answer:
        "Yes, we offer special pricing for qualified nonprofits, educational institutions, and open-source projects. Please contact our sales team for more information and to verify your eligibility.",
    },
    {
      question: "How secure is my data?",
      answer:
        "We take security very seriously. All data is encrypted both in transit and at rest. We use industry-standard security practices, regular security audits, and maintain compliance with relevant regulations. Our infrastructure is hosted on secure cloud providers with multiple redundancies and backups.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "All plans include access to our help center, documentation, and community forums. The Starter plan includes email support with a 24-hour response time. The Professional plan includes priority email support with a 4-hour response time. The Enterprise plan includes dedicated support with a 1-hour response time and a dedicated account manager.",
    },
  ];

  return (
    <section ref={ref} className="bg-muted/30 px-4 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="space-y-16"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mx-auto max-w-2xl space-y-4 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
            <p className="text-muted-foreground md:text-lg">Find answers to common questions about our application and services.</p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="space-y-4"
          >
            <FaqAccordion items={faqs} />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-muted-foreground">
              Still have questions? We&apos;re here to help.{" "}
              <Link href="#" className="font-medium text-primary hover:underline">
                Contact our support team
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CtaSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section ref={ref} className="bg-background px-4 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/80 to-primary p-8 md:p-12 lg:p-16"
        >
          <div className="absolute inset-0 z-0 opacity-20">
            <svg className="h-full w-full" viewBox="0 0 800 800">
              <defs>
                <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">Ready to Transform Your Workflow?</h2>
            <p className="mb-8 text-lg text-white/90 md:text-xl">Join thousands of satisfied users who have improved their productivity and streamlined their processes with our application.</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary">
                Start Your Free Trial
              </Button>
              <Button size="lg" variant="default">
                Schedule a Demo
              </Button>
            </div>
            <p className="mt-4 text-sm text-white/80">No credit card required. 14-day free trial.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
