<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* database/events/editor_form.twig */
class __TwigTemplate_f597722e59c73cd1df1477d0607947741940cdaa474e6054e0a839835ed3b68a extends \Twig\Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        echo "<form class=\"rte_form\" action=\"";
        echo PhpMyAdmin\Url::getFromRoute("/database/events");
        echo "\" method=\"post\">
  ";
        // line 2
        echo PhpMyAdmin\Url::getHiddenInputs(($context["db"] ?? null));
        echo "
  <input name=\"";
        // line 3
        echo twig_escape_filter($this->env, ($context["mode"] ?? null), "html", null, true);
        echo "_item\" type=\"hidden\" value=\"1\">
  ";
        // line 4
        if ((($context["mode"] ?? null) == "edit")) {
            // line 5
            echo "    <input name=\"item_original_name\" type=\"hidden\" value=\"";
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_original_name", [], "any", false, false, false, 5), "html", null, true);
            echo "\">
  ";
        }
        // line 7
        echo "
  <fieldset>
    <legend>";
        // line 9
        echo _gettext("Details");
        echo "</legend>
    <table class=\"rte_table table table-borderless table-sm\">
      <tr>
        <td>";
        // line 12
        echo _gettext("Event name");
        echo "</td>
        <td>
          <input type=\"text\" name=\"item_name\" value=\"";
        // line 14
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_name", [], "any", false, false, false, 14), "html", null, true);
        echo "\" maxlength=\"64\">
        </td>
      </tr>
      <tr>
        <td>";
        // line 18
        echo _gettext("Status");
        echo "</td>
        <td>
          <select name=\"item_status\">
            ";
        // line 21
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["status_display"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["status"]) {
            // line 22
            echo "              <option value=\"";
            echo twig_escape_filter($this->env, $context["status"], "html", null, true);
            echo "\"";
            echo ((($context["status"] == twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_status", [], "any", false, false, false, 22))) ? (" selected") : (""));
            echo ">";
            echo twig_escape_filter($this->env, $context["status"], "html", null, true);
            echo "</option>
            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['status'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 24
        echo "          </select>
        </td>
      </tr>
      <tr>
        <td>";
        // line 28
        echo _gettext("Event type");
        echo "</td>
        <td>
          ";
        // line 30
        if (($context["is_ajax"] ?? null)) {
            // line 31
            echo "            <select name=\"item_type\">
              ";
            // line 32
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(($context["event_type"] ?? null));
            foreach ($context['_seq'] as $context["_key"] => $context["type"]) {
                // line 33
                echo "                <option value=\"";
                echo twig_escape_filter($this->env, $context["type"], "html", null, true);
                echo "\"";
                echo ((($context["type"] == twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_type", [], "any", false, false, false, 33))) ? (" selected") : (""));
                echo ">";
                echo twig_escape_filter($this->env, $context["type"], "html", null, true);
                echo "</option>
              ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['type'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 35
            echo "            </select>
          ";
        } else {
            // line 37
            echo "            <input name=\"item_type\" type=\"hidden\" value=\"";
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_type", [], "any", false, false, false, 37), "html", null, true);
            echo "\">
            <div class=\"font_weight_bold text-center w-50\">
              ";
            // line 39
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_type", [], "any", false, false, false, 39), "html", null, true);
            echo "
            </div>
            <input type=\"submit\" name=\"item_changetype\" class=\"w-50\" value=\"";
            // line 41
            echo twig_escape_filter($this->env, sprintf(_gettext("Change to %s"), twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_type_toggle", [], "any", false, false, false, 41)), "html", null, true);
            echo "\">
          ";
        }
        // line 43
        echo "        </td>
      </tr>
      <tr class=\"onetime_event_row";
        // line 45
        echo (((twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_type", [], "any", false, false, false, 45) != "ONE TIME")) ? (" hide") : (""));
        echo "\">
        <td>";
        // line 46
        echo _gettext("Execute at");
        echo "</td>
        <td class=\"nowrap\">
          <input type=\"text\" name=\"item_execute_at\" value=\"";
        // line 48
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_execute_at", [], "any", false, false, false, 48), "html", null, true);
        echo "\" class=\"datetimefield\">
        </td>
      </tr>
      <tr class=\"recurring_event_row";
        // line 51
        echo (((twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_type", [], "any", false, false, false, 51) != "RECURRING")) ? (" hide") : (""));
        echo "\">
        <td>";
        // line 52
        echo _gettext("Execute every");
        echo "</td>
        <td>
          <input class=\"w-50\" type=\"text\" name=\"item_interval_value\" value=\"";
        // line 54
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_interval_value", [], "any", false, false, false, 54), "html", null, true);
        echo "\">
          <select class=\"w-50\" name=\"item_interval_field\">
            ";
        // line 56
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["event_interval"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["interval"]) {
            // line 57
            echo "              <option value=\"";
            echo twig_escape_filter($this->env, $context["interval"], "html", null, true);
            echo "\"";
            echo ((($context["interval"] == twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_interval_field", [], "any", false, false, false, 57))) ? (" selected") : (""));
            echo ">";
            echo twig_escape_filter($this->env, $context["interval"], "html", null, true);
            echo "</option>
            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['interval'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 59
        echo "          </select>
        </td>
      </tr>
      <tr class=\"recurring_event_row";
        // line 62
        echo (((twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_type", [], "any", false, false, false, 62) != "RECURRING")) ? (" hide") : (""));
        echo "\">
        <td>";
        // line 63
        echo _pgettext(        "Start of recurring event", "Start");
        echo "</td>
        <td class=\"nowrap\">
          <input type=\"text\" name=\"item_starts\" value=\"";
        // line 65
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_starts", [], "any", false, false, false, 65), "html", null, true);
        echo "\" class=\"datetimefield\">
        </td>
      </tr>
      <tr class=\"recurring_event_row";
        // line 68
        echo (((twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_type", [], "any", false, false, false, 68) != "RECURRING")) ? (" hide") : (""));
        echo "\">
        <td>";
        // line 69
        echo _pgettext(        "End of recurring event", "End");
        echo "</td>
        <td class=\"nowrap\">
          <input type=\"text\" name=\"item_ends\" value=\"";
        // line 71
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_ends", [], "any", false, false, false, 71), "html", null, true);
        echo "\" class=\"datetimefield\">
        </td>
      </tr>
      <tr>
        <td>";
        // line 75
        echo _gettext("Definition");
        echo "</td>
        <td>
          <textarea name=\"item_definition\" rows=\"15\" cols=\"40\">";
        // line 78
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_definition", [], "any", false, false, false, 78), "html", null, true);
        // line 79
        echo "</textarea>
        </td>
      </tr>
      <tr>
        <td>";
        // line 83
        echo _gettext("On completion preserve");
        echo "</td>
        <td>
          <input type=\"checkbox\" name=\"item_preserve\"";
        // line 85
        echo twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_preserve", [], "any", false, false, false, 85);
        echo ">
        </td>
      </tr>
      <tr>
        <td>";
        // line 89
        echo _gettext("Definer");
        echo "</td>
        <td>
          <input type=\"text\" name=\"item_definer\" value=\"";
        // line 91
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_definer", [], "any", false, false, false, 91), "html", null, true);
        echo "\">
        </td>
      </tr>
      <tr>
        <td>";
        // line 95
        echo _gettext("Comment");
        echo "</td>
        <td>
          <input type=\"text\" name=\"item_comment\" value=\"";
        // line 97
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, ($context["event"] ?? null), "item_comment", [], "any", false, false, false, 97), "html", null, true);
        echo "\" maxlength=\"64\">
        </td>
      </tr>
    </table>
  </fieldset>
  ";
        // line 102
        if (($context["is_ajax"] ?? null)) {
            // line 103
            echo "    <input type=\"hidden\" name=\"editor_process_";
            echo twig_escape_filter($this->env, ($context["mode"] ?? null), "html", null, true);
            echo "\" value=\"true\">
    <input type=\"hidden\" name=\"ajax_request\" value=\"true\">
  ";
        } else {
            // line 106
            echo "    <fieldset class=\"tblFooters\">
      <input type=\"submit\" name=\"editor_process_";
            // line 107
            echo twig_escape_filter($this->env, ($context["mode"] ?? null), "html", null, true);
            echo "\" value=\"";
            echo _gettext("Go");
            echo "\">
    </fieldset>
  ";
        }
        // line 110
        echo "</form>
";
    }

    public function getTemplateName()
    {
        return "database/events/editor_form.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  312 => 110,  304 => 107,  301 => 106,  294 => 103,  292 => 102,  284 => 97,  279 => 95,  272 => 91,  267 => 89,  260 => 85,  255 => 83,  249 => 79,  247 => 78,  242 => 75,  235 => 71,  230 => 69,  226 => 68,  220 => 65,  215 => 63,  211 => 62,  206 => 59,  193 => 57,  189 => 56,  184 => 54,  179 => 52,  175 => 51,  169 => 48,  164 => 46,  160 => 45,  156 => 43,  151 => 41,  146 => 39,  140 => 37,  136 => 35,  123 => 33,  119 => 32,  116 => 31,  114 => 30,  109 => 28,  103 => 24,  90 => 22,  86 => 21,  80 => 18,  73 => 14,  68 => 12,  62 => 9,  58 => 7,  52 => 5,  50 => 4,  46 => 3,  42 => 2,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "database/events/editor_form.twig", "E:\\IIS Servers\\smart-canteen\\phpMyAdmin\\templates\\database\\events\\editor_form.twig");
    }
}
