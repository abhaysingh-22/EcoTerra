import FeedbackForm from './feedback-form';

export default function AppFooter() {
  return (
    <footer id="feedback" className="bg-accent text-accent-foreground py-12 md:py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="font-headline text-3xl font-bold">Share Your Thoughts</h3>
          <p className="mt-2 text-lg text-accent-foreground/80">
            Have a suggestion for an eco-friendly destination or feedback on our tools? We&apos;d love to
            hear from you!
          </p>
        </div>
        <FeedbackForm />
      </div>
      <div className="container mx-auto px-4 mt-12 text-center text-accent-foreground/60">
        <p>&copy; {new Date().getFullYear()} EcoTerra Journeys. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
