import { MjoBreadcrumbsNavigateEvent } from "../../src/types/mjo-breadcrumbs";

import { AiFillHome, AiFillStar } from "mjo-icons/ai";
import { HiDocumentText, HiFolderOpen, HiHome } from "mjo-icons/hi";

function changeBreadcrumbsProp(prop: string, value: string | boolean): void {
    const breadcrumbs = document.getElementById("playground-breadcrumbs");
    if (!breadcrumbs) return;

    let icon: string | undefined = undefined;
    if (prop === "separator") {
        if (value === "icon1") {
            icon = AiFillStar;
        } else if (value === "icon2") {
            icon = AiFillHome;
        }

        if (icon) {
            value = icon;
        } else {
            // Remove attribute to use default
            breadcrumbs.removeAttribute(prop);
            return;
        }
    }

    if (typeof value === "string") {
        breadcrumbs.setAttribute(prop, value);
    } else {
        if (value) {
            breadcrumbs.setAttribute(prop, "");
        } else {
            breadcrumbs.removeAttribute(prop);
        }
    }
}

function setBasicBreadcrumbs(): void {
    const breadcrumbs = document.getElementById("playground-breadcrumbs");
    if (!breadcrumbs) return;

    const items = [
        { label: "Home", href: "/" },
        { label: "Category", href: "/category" },
        { label: "Subcategory", href: "/category/subcategory" },
        { label: "Current Page" },
    ];

    (breadcrumbs as any).items = items;
}

function setWithIconsBreadcrumbs(): void {
    const breadcrumbs = document.getElementById("playground-breadcrumbs");
    if (!breadcrumbs) return;

    const items = [
        { label: "Home", href: "/", icon: HiHome },
        { label: "Documents", href: "/documents", icon: HiFolderOpen },
        { label: "Report.pdf", icon: HiDocumentText },
    ];

    (breadcrumbs as any).items = items;
}

function setDeepBreadcrumbs(): void {
    const breadcrumbs = document.getElementById("playground-breadcrumbs");
    if (!breadcrumbs) return;

    const items = [
        { label: "Home", href: "/" },
        { label: "Category", href: "/category" },
        { label: "Subcategory", href: "/category/subcategory" },
        { label: "Product Type", href: "/category/subcategory/type" },
        { label: "Product", href: "/category/subcategory/type/product" },
        { label: "Details" },
    ];

    (breadcrumbs as any).items = items;
}

function initializeBreadcrumbsExamples(): void {
    // Basic breadcrumbs for size examples
    const sizeExamples = document.querySelectorAll("mjo-breadcrumbs[size]");
    sizeExamples.forEach((breadcrumb) => {
        (breadcrumb as any).items = [{ label: "Home", href: "/" }, { label: "Page", href: "/page" }, { label: "Current" }];
    });

    // Color examples
    const colorExamples = document.querySelectorAll("mjo-breadcrumbs[color]");
    colorExamples.forEach((breadcrumb) => {
        (breadcrumb as any).items = [{ label: "Home", href: "/" }, { label: "Page", href: "/page" }, { label: "Current" }];
    });

    // Variant examples
    const variantExamples = document.querySelectorAll("mjo-breadcrumbs[variant]");
    variantExamples.forEach((breadcrumb) => {
        (breadcrumb as any).items = [{ label: "Home", href: "/" }, { label: "Page", href: "/page" }, { label: "Current" }];
    });

    // Icon breadcrumbs
    const iconBreadcrumbs = document.getElementById("icon-breadcrumbs");
    if (iconBreadcrumbs) {
        (iconBreadcrumbs as any).items = [
            { label: "Home", href: "/", icon: HiHome },
            { label: "Documents", href: "/documents", icon: HiFolderOpen },
            { label: "Report.pdf", icon: HiDocumentText },
        ];
    }

    // Deep navigation
    const deepBreadcrumbs = document.getElementById("deep-breadcrumbs");
    if (deepBreadcrumbs) {
        (deepBreadcrumbs as any).items = [
            { label: "Home", href: "/" },
            { label: "Electronics", href: "/electronics" },
            { label: "Computers", href: "/electronics/computers" },
            { label: "Laptops", href: "/electronics/computers/laptops" },
            { label: "Gaming", href: "/electronics/computers/laptops/gaming" },
            { label: "Product Details" },
        ];
    }

    // Custom separator
    const customSeparator = document.getElementById("custom-separator");
    if (customSeparator) {
        (customSeparator as any).items = [{ label: "Home", href: "/" }, { label: "Favorites", href: "/favorites" }, { label: "My List" }];
    }

    // Auto navigate
    const autoNavigate = document.getElementById("auto-navigate");
    if (autoNavigate) {
        (autoNavigate as any).items = [{ label: "Home", href: "/" }, { label: "Page", href: "/page" }, { label: "Current" }];
    }

    // Initialize playground with basic items
    setBasicBreadcrumbs();
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    initializeBreadcrumbsExamples();

    document.querySelectorAll("mjo-breadcrumbs").forEach((breadcrumbs) => {
        breadcrumbs.addEventListener("mjo-breadcrumbs:navigate", (ev: Event) => {
            const event = ev as MjoBreadcrumbsNavigateEvent;
            const { item, index, href } = event.detail;
            alert(`Navigate to: ${item.label} (index: ${index}, href: ${href})`);
        });
    });
});

window.changeBreadcrumbsProp = changeBreadcrumbsProp;
window.setBasicBreadcrumbs = setBasicBreadcrumbs;
window.setWithIconsBreadcrumbs = setWithIconsBreadcrumbs;
window.setDeepBreadcrumbs = setDeepBreadcrumbs;

// Make functions globally available
declare global {
    interface Window {
        changeBreadcrumbsProp: (prop: string, value: string | boolean) => void;
        setBasicBreadcrumbs: () => void;
        setWithIconsBreadcrumbs: () => void;
        setDeepBreadcrumbs: () => void;
    }
}
