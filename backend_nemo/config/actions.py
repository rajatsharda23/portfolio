# Action: To check for blocked terms!

from typing import Optional
import logging

from nemoguardrails.actions import action
from nemoguardrails import LLMRails
from nemoguardrails.llm.taskmanager import LLMTaskManager
from langchain.llms.base import BaseLLM
from nemoguardrails import RailsConfig
from nemoguardrails.actions.actions import ActionResult, action
from nemoguardrails.actions.llm.utils import llm_call
from nemoguardrails.llm.params import llm_params
from nemoguardrails.actions.llm.utils import (
    get_multiline_response,
    llm_call,
    strip_quotes,
)


log = logging.getLogger(__name__)


@action(is_system_action=True)
async def check_blocked_terms(context: Optional[dict] = None):
    # Retrieve the bot's response message from the context
    bot_response = context.get("bot_message", "")

    # A list of proprietary terms. This can also be read from a file for better maintainability.
    proprietary_terms = ["siblings", "girlfriend", "parents", "salary", "girlfriends"]

    # Convert the bot response to lowercase for case-insensitive comparison
    bot_response_lower = bot_response.lower()

    # Check if any of the proprietary terms are present in the bot response
    for term in proprietary_terms:
        if term in bot_response_lower:
            return True

    return False

@action(is_system_action=True)
async def blocked_topics(
    llm_task_manager: LLMTaskManager,
    context: Optional[dict] = None,
    llm: Optional[BaseLLM] = None,
    config: Optional[RailsConfig] = None,
) -> bool:
    """Prompt the LLM to determine if the user's message shows intent to discuss proprietary terms."""
    print('Hiiii')

    if config is None:
        config = RailsConfig.from_path("./config")
        
    if llm is None:
        rails = LLMRails(config)
        llm = rails.llm

    user_input = context.get("user_message")
    log.info(f"User input received: {user_input}")

    if user_input:
        proprietary_terms = ["siblings", "girlfriend", "parents", "salary", "girlfriends"]
        prompt = llm_task_manager.render_task_prompt(
            task="blocked_topics",
            context={"user_input": user_input, "proprietary_terms": proprietary_terms},
        )
        stop = llm_task_manager.get_stop_tokens(task="blocked_topics")

        with llm_params(llm, temperature=config.lowest_temperature):
            check = await llm_call(llm, prompt, stop=stop)

        check = check.lower().strip() if check else False
        log.info(f"Proprietary terms intent determined: {check}")

        return ActionResult(
            return_value=check
        )

    return ActionResult(
        return_value=False
    )

#Find Category Action!
@action(is_system_action=True)
async def find_category(
    llm_task_manager: LLMTaskManager,
    context: Optional[dict] = None,
    llm: Optional[BaseLLM] = None,
    config: Optional[RailsConfig] = None,
) -> str:
    """Prompt the LLM to determine the category that the user input belongs to."""
    
    if config is None:
        config = RailsConfig.from_path("./config")
        
    if llm is None:
        rails = LLMRails(config)
        llm = rails.llm

    user_input = context.get("user_message")
    log.info(f"User input received: {user_input}")

    if user_input:
        prompt = llm_task_manager.render_task_prompt(
            task="find_category",
            context={"user_input": user_input},
        )
        stop = llm_task_manager.get_stop_tokens(task="find_category")

        with llm_params(llm, temperature=config.lowest_temperature):
            check = await llm_call(llm, prompt, stop=stop)

        check = check.lower().strip() if check else "bad conduct"
        log.info(f"Category determined: {check}")

        return ActionResult(
            return_value=check
        )

    return ActionResult(
        return_value="bad conduct"
    )


def init(app: LLMRails):
    app.register_action(find_category, "find_category")
    app.register_action(blocked_topics, "blocked_topics")