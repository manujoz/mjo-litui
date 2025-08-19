import { html } from "lit";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";

export class AvatarController {
    /**
     * Renders the complete demo page for mjo-avatar
     */
    async renderAvatarPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-avatar");

        if (!component) {
            throw new Error("mjo-avatar component not found");
        }

        const avatarTemplate = html`
            <mjo-theme scope="global" theme="light"></mjo-theme>

            <div class="page-header">
                <h1>🧑‍💼 ${component.displayName}</h1>
                <p>${component.description}</p>
                <div class="feature-badges">
                    <span class="badge">✨ Interactive</span>
                    <span class="badge">🎨 Themeable</span>
                    <span class="badge">📱 Responsive</span>
                </div>
            </div>

            <!-- Interactive Demo Section -->
            <div class="demo-section interactive-demo">
                <h2>🎮 Interactive Avatar Playground</h2>
                <p>Customize and interact with avatars in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container">
                    <div class="avatar-showcase">
                        <mjo-avatar id="playground-avatar" size="large" name="Interactive Demo" class="interactive-avatar"></mjo-avatar>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Size</h4>
                            <div class="button-group">
                                <button onclick="changeAvatarProp('size', 'small')" class="control-btn">Small</button>
                                <button onclick="changeAvatarProp('size', 'medium')" class="control-btn active">Medium</button>
                                <button onclick="changeAvatarProp('size', 'large')" class="control-btn">Large</button>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Style</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="toggleAvatarProp('bordered')" />
                                    <span>Bordered</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="toggleAvatarProp('nameColoured')" />
                                    <span>Name Colored</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Name</h4>
                            <input
                                type="text"
                                placeholder="Enter name..."
                                oninput="changeAvatarProp('name', this.value)"
                                class="name-input"
                                value="Interactive Demo"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="demo-section">
                <h2>📏 Available Sizes</h2>
                <p>The avatar component supports different sizes to fit various use cases.</p>
                <div class="component-showcase hover-effects">
                    <div class="avatar-item">
                        <mjo-avatar size="small" name="SM" class="hover-avatar"></mjo-avatar>
                        <span class="size-label">Small (32px)</span>
                    </div>
                    <div class="avatar-item">
                        <mjo-avatar size="medium" name="MD" class="hover-avatar"></mjo-avatar>
                        <span class="size-label">Medium (40px)</span>
                    </div>
                    <div class="avatar-item">
                        <mjo-avatar size="large" name="LG" class="hover-avatar"></mjo-avatar>
                        <span class="size-label">Large (48px)</span>
                    </div>
                </div>
            </div>

            <div class="demo-section">
                <h2>🎨 Style Variants</h2>
                <p>Customize the avatar appearance with borders and colors.</p>

                <h3>With Borders</h3>
                <div class="component-showcase">
                    <mjo-avatar name="AB" bordered class="clickable-avatar" onclick="avatarClick(this)"></mjo-avatar>
                    <mjo-avatar name="CD" bordered size="medium" class="clickable-avatar" onclick="avatarClick(this)"></mjo-avatar>
                    <mjo-avatar name="EF" bordered size="large" class="clickable-avatar" onclick="avatarClick(this)"></mjo-avatar>
                </div>

                <h3>With Name Colors</h3>
                <div class="component-showcase">
                    <mjo-avatar name="GH" nameColoured class="clickable-avatar" onclick="avatarClick(this)"></mjo-avatar>
                    <mjo-avatar name="IJ" nameColoured size="medium" class="clickable-avatar" onclick="avatarClick(this)"></mjo-avatar>
                    <mjo-avatar name="KL" nameColoured size="large" class="clickable-avatar" onclick="avatarClick(this)"></mjo-avatar>
                </div>

                <h3>Combined (Border + Color)</h3>
                <div class="component-showcase">
                    <mjo-avatar name="MN" bordered nameColoured class="clickable-avatar" onclick="avatarClick(this)"></mjo-avatar>
                    <mjo-avatar name="OP" bordered nameColoured size="medium" class="clickable-avatar" onclick="avatarClick(this)"></mjo-avatar>
                    <mjo-avatar name="QR" bordered nameColoured size="large" class="clickable-avatar" onclick="avatarClick(this)"></mjo-avatar>
                </div>
            </div>

            <!-- Advanced Use Cases Section -->
            <div class="demo-section">
                <h2>🚀 Advanced Use Cases</h2>

                <h3>🏢 Team Dashboard</h3>
                <div class="dashboard-demo">
                    <div class="team-header">
                        <h4>Development Team</h4>
                        <button class="add-member-btn" onclick="addTeamMember()">+ Add Member</button>
                    </div>
                    <div class="team-grid" id="team-grid">
                        <div class="team-member" onclick="selectMember(this)">
                            <mjo-avatar name="JS" size="medium" bordered nameColoured></mjo-avatar>
                            <div class="member-info">
                                <div class="member-name">John Smith</div>
                                <div class="member-role">Lead Developer</div>
                                <div class="member-status online">● Online</div>
                            </div>
                        </div>
                        <div class="team-member" onclick="selectMember(this)">
                            <mjo-avatar name="MG" size="medium" bordered nameColoured></mjo-avatar>
                            <div class="member-info">
                                <div class="member-name">María García</div>
                                <div class="member-role">UX Designer</div>
                                <div class="member-status away">● Away</div>
                            </div>
                        </div>
                        <div class="team-member" onclick="selectMember(this)">
                            <mjo-avatar name="AL" size="medium" bordered nameColoured></mjo-avatar>
                            <div class="member-info">
                                <div class="member-name">Ana López</div>
                                <div class="member-role">Product Manager</div>
                                <div class="member-status online">● Online</div>
                            </div>
                        </div>
                    </div>
                </div>

                <h3>💬 Chat Interface</h3>
                <div class="chat-demo">
                    <div class="chat-messages" id="chat-messages">
                        <div class="message">
                            <mjo-avatar name="JS" size="small" nameColoured class="message-avatar"></mjo-avatar>
                            <div class="message-content">
                                <div class="message-header">
                                    <span class="sender">John Smith</span>
                                    <span class="timestamp">2:30 PM</span>
                                </div>
                                <div class="message-text">Hey team! How's the progress on the new feature?</div>
                            </div>
                        </div>
                        <div class="message">
                            <mjo-avatar name="MG" size="small" nameColoured class="message-avatar"></mjo-avatar>
                            <div class="message-content">
                                <div class="message-header">
                                    <span class="sender">María García</span>
                                    <span class="timestamp">2:32 PM</span>
                                </div>
                                <div class="message-text">Almost done with the designs! Should be ready by tomorrow.</div>
                            </div>
                        </div>
                        <div class="message my-message">
                            <div class="message-content">
                                <div class="message-header">
                                    <span class="sender">You</span>
                                    <span class="timestamp">2:33 PM</span>
                                </div>
                                <div class="message-text">Awesome! I'll start on the implementation then.</div>
                            </div>
                            <mjo-avatar name="YU" size="small" nameColoured class="message-avatar"></mjo-avatar>
                        </div>
                    </div>
                    <div class="chat-input">
                        <input type="text" placeholder="Type a message..." onkeypress="handleChatInput(event)" id="chat-input" />
                        <button onclick="sendMessage()">Send</button>
                    </div>
                </div>

                <h3>👥 User Selection</h3>
                <div class="user-selection-demo">
                    <div class="selection-header">
                        <h4>Assign to:</h4>
                        <div class="selected-count" id="selected-count">0 selected</div>
                    </div>
                    <div class="selectable-users">
                        <div class="user-card selectable" onclick="toggleUserSelection(this)" data-user="john">
                            <mjo-avatar name="JS" size="medium" bordered></mjo-avatar>
                            <div class="user-info">
                                <div class="user-name">John Smith</div>
                                <div class="user-email">john@example.com</div>
                            </div>
                            <div class="selection-indicator">✓</div>
                        </div>
                        <div class="user-card selectable" onclick="toggleUserSelection(this)" data-user="maria">
                            <mjo-avatar name="MG" size="medium" bordered nameColoured></mjo-avatar>
                            <div class="user-info">
                                <div class="user-name">María García</div>
                                <div class="user-email">maria@example.com</div>
                            </div>
                            <div class="selection-indicator">✓</div>
                        </div>
                        <div class="user-card selectable" onclick="toggleUserSelection(this)" data-user="ana">
                            <mjo-avatar name="AL" size="medium" bordered nameColoured></mjo-avatar>
                            <div class="user-info">
                                <div class="user-name">Ana López</div>
                                <div class="user-email">ana@example.com</div>
                            </div>
                            <div class="selection-indicator">✓</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="demo-section">
                <h2>🔧 Available Properties</h2>
                <div class="properties-table">
                    <div class="property-row">
                        <div class="property-name">name</div>
                        <div class="property-type">string</div>
                        <div class="property-desc">Text to display (initials)</div>
                    </div>
                    <div class="property-row">
                        <div class="property-name">size</div>
                        <div class="property-type">"small" | "medium" | "large"</div>
                        <div class="property-desc">Avatar size</div>
                    </div>
                    <div class="property-row">
                        <div class="property-name">bordered</div>
                        <div class="property-type">boolean</div>
                        <div class="property-desc">Adds border to avatar</div>
                    </div>
                    <div class="property-row">
                        <div class="property-name">nameColoured</div>
                        <div class="property-type">boolean</div>
                        <div class="property-desc">Applies background color based on name</div>
                    </div>
                </div>
            </div>

            <div class="nav-links">
                <a href="/">← Back to home</a>
                <a href="/component/mjo-chip">View mjo-chip →</a>
            </div>
        `;

        return ssrRenderer.renderPage(avatarTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: ["/public/js/avatar-interactions.js"],
        });
    }
}
